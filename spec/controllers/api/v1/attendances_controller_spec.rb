# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:company) { create :company, :with_business_days, timezone: 'Etc/UTC' }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #today' do
    context 'when have not today attendance' do
      subject { get :today }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when have today attendance' do
      let!(:attend_ok) { create :attendance, user: login_user, attending_status: 'attend_ok', day: Time.zone.today }
      subject { get :today }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendance: response_attendance, company: response_company) }
    end
  end

  describe 'GET #chart' do
    context 'when params is invalid' do
      subject { get :chart, params: { date: 'invalid' } }
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart) }
    end

    context 'when chart absolutely has no data' do
      subject { get :chart, params: { date: Date.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart) }
    end

    context 'when chart has no data in month' do
      let!(:attendance) { create :attendance, user: login_user, attending_status: 'attend_ok', leaving_status: 'leave_ok', day: Date.current - 1.month }

      subject { get :chart, params: { date: Date.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart) }
    end

    context 'when chart has data' do
      let!(:attendance) { create :attendance, user: login_user, attending_status: 'attend_ok', leaving_status: 'leave_ok', day: Date.current }

      subject { get :chart, params: { date: Date.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart) }
    end
  end

  describe 'GET #index' do
    context 'when have search params' do
      let(:params) do
        {
          status: 'attend_ok',
          from_date: Time.current,
          to_date: 2.days.from_now
        }
      end
      let!(:attend_ok) { create :attendance, user: login_user, attending_status: 'attend_ok', day: 1.day.ago }
      let!(:attendance_1) { create :attendance, user: login_user, attending_status: 'attend_ok', day: Date.current }
      let!(:attendance_2) { create :attendance, user: login_user, attending_status: 'attend_ok', day: 1.day.from_now }

      subject { get :index, params: params }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(2) { response_attendance }, meta: response_pagination.merge(forgot_punch_in_days: Array)) }
    end

    context 'when have no search params' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 4.days.ago }
      let!(:attendance_2) { create :attendance, user: login_user, day: 5.days.ago }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(2) { response_attendance }, meta: response_pagination.merge(forgot_punch_in_days: Array)) }
    end
  end

  describe 'GET #calendar' do
    context 'when params valid date formant' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 1.day.ago }

      subject { get :calendar, params: { day: Time.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(1) { response_attendance }) }
    end

    context 'when there are holidays in month' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 1.day.ago }
      let!(:holidays) { create_list :holiday, 2, company: company, started_at: Date.current, ended_at: Date.current + 1.day }

      subject { get :calendar, params: { day: Date.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(1) { response_attendance }, holidays: Array.new(2) { response_holiday }) }
    end

    context 'when params invalid date formant' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 1.day.ago }

      subject { get :calendar, params: { date: 'invalid' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(0) { response_attendance }) }
    end
  end

  describe 'POST #create' do
    context 'when attendance is created and already checked in and checked out' do
      let!(:attendance) { create :attendance, user: login_user, off_status: nil }

      subject { post :create, params: { user_id: login_user.id } }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when attendance is not created yet' do
      subject { post :create, params: { user_id: login_user.id } }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
    end
  end

  describe 'PATCH #update' do
    context 'when attendance is not created yet' do
      subject { patch :update, params: { user_id: login_user.id, id: 1 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is created and not checked in yet' do
      let(:attendance) { create :attendance, user: login_user, attended_at: nil, attending_status: nil, left_at: nil, leaving_status: nil }

      subject { patch :update, params: { user_id: login_user.id, id: attendance.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is checked in and out' do
      let(:attendance) { create :attendance, user: login_user }

      subject { patch :update, params: { user_id: login_user.id, id: attendance.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is checked in and not checked out yet' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 10) }
      let(:atd) { create :attendance, user: login_user, attended_at: '10:30', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time + 1.hour) }

      after { Timecop.return }

      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
      it 'should change attendance leaving attributes' do
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.left_at.strftime('%H:%M')).to eq Time.current.strftime('%H:%M')
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).not_to eq 0
      end
    end

    context 'when user go before morning start and leave after afternoon end' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 17, 37) }
      let(:atd) { create :attendance, user: login_user, attended_at: '07:37', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 28800
      }
    end

    context 'when user take off in afternoon' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 12, 30) }
      let(:atd) { create :attendance, user: login_user, attended_at: '07:37', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 14400
      }
    end

    context 'when user take off in morning' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 17, 30) }
      let(:atd) { create :attendance, user: login_user, attended_at: '13:00', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 14400
      }
    end

    context 'when user go before morning start and leave 3:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 15, 30) }
      let(:atd) { create :attendance, user: login_user, attended_at: '7:50', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 21600
      }
    end

    context 'when user go 8:30 and leave 9:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 9, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '8:30', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 1800
      }
    end

    context 'when user go 11:00 and leave 12:1' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 12, 0o1) }
      let(:atd) { create :attendance, user: login_user, attended_at: '11:00', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 3600
      }
    end

    context 'when user go 11:00 and leave 14:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 14, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '11:00', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 5400
      }
    end

    context 'when user go 11:00 and leave 18:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 18, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '11:00', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 18000
      }
    end

    context 'when user go 12:30 and leave 14:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 14, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '12:30', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 1800
      }
    end

    context 'when user go 12:30 and leave 18:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 18, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '12:30', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 14400
      }
    end

    context 'when user go 14:30 and leave 15:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 15, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '14:30', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 1800
      }
    end

    context 'when user go 16:00 and leave 18:00' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 18, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '16:00', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 5400
      }
    end

    context 'when user go after morning start and leave 10:56' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 12, 56) }
      let(:atd) { create :attendance, user: login_user, attended_at: '10:56', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 3840
      }
    end

    context 'when user leave before morning started ' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 7, 0o0) }
      let(:atd) { create :attendance, user: login_user, attended_at: '7:56', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_early'
        expect(attendance.working_hours).to eq 0
      }
    end

    context 'when user go after afternoon ended ' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 17, 57) }
      let(:atd) { create :attendance, user: login_user, attended_at: '17:56', left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time) }
      after { Timecop.return }
      subject { patch :update, params: { user_id: login_user.id, id: atd.id } }

      it {
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.leaving_status).to eq 'leave_ok'
        expect(attendance.working_hours).to eq 0
      }
    end
  end
end
