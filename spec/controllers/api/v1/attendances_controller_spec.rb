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
    context 'when had not today attendane' do
      subject { get :today }
      
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as({}) }
    end

    context 'when had today attendane' do
      let!(:attend_ok) { create :attendance, user: login_user, attending_status: 'attend_ok', day: Date.today }
      subject { get :today }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
    end
  end

  describe 'GET #chart' do
    context 'when params is invalid' do
      subject { get :chart, params: { date: 'invalid' } }
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(nil) }
    end

    context 'when chart absolutely has no data' do
      subject { get :chart, params: { date: Date.current } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(nil) }
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
      its(:body) { is_expected.to be_json_as(attendances: Array.new(2) { response_attendance }, meta: response_pagination) }
    end

    context 'when have no search params' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 4.days.ago }
      let!(:attendance_2) { create :attendance, user: login_user, day: 5.days.ago }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(2) { response_attendance }, meta: response_pagination) }
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

      subject { get :calendar, params: { day: 'invalid' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(0) { response_attendance }) }
    end
  end

  describe 'POST #create' do
    context 'when attendance is created and already checked in and checked out' do
      let!(:attendance) { create :attendance, user: login_user, off_status: nil }

      subject { post :create }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when attendance is not created yet' do
      subject { post :create }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
    end
  end

  describe 'PATCH #update' do
    context 'when attendance is not created yet' do
      subject { patch :update, params: { id: 1 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is created and not checked in yet' do
      let(:attendance) { create :attendance, user: login_user, attended_at: nil, attending_status: nil, left_at: nil, leaving_status: nil }

      subject { patch :update, params: { id: attendance.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is checked in and out' do
      let(:attendance) { create :attendance, user: login_user }

      subject { patch :update, params: { id: attendance.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is checked in and not checked out yet' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 10) }
      let(:atd) { create :attendance, user: login_user, left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time + 1.hour) }

      after { Timecop.return }

      subject { patch :update, params: { id: atd.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
      it 'should change attendance leaving attributes' do
        is_expected
        attendance = Attendance.find(atd.id)
        expect(attendance.left_at.strftime('%H:%M')).to eq Time.current.strftime('%H:%M')
        expect(attendance.leaving_status).to eq 'leave_early'
      end
    end

    context 'when attendance is checked out in block time' do
      let(:local_time) { Time.zone.local(2017, 12, 20, 16, 5) }
      let(:atd) { create :attendance, user: login_user, left_at: nil, leaving_status: nil, updated_at: local_time }

      before { Timecop.freeze(local_time + 4.minutes) }

      after { Timecop.return }

      subject { patch :update, params: { id: atd.id } }

      its(:code) { is_expected.to eq '403' }
      its(:body) { is_expected.to be_json_as(response_403) }
    end
  end
end
