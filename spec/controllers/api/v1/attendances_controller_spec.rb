# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:company) { create :company, :with_business_days }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #chart' do
    context 'when status invalid' do
      subject { get :chart, params: { status: 'invalid' } }
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart(0)) }
    end

    context 'when current year has no attendance' do
      before do
        create :attendance, user: login_user, attending_status: 'attend_ok', day: 1.year.ago
      end
      subject { get :chart, params: { status: 'attend_ok' } }
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_attendance_chart(0)) }
    end

    context 'when filter by attending_status' do
      before do
        12.times do |i|
          create :attendance, user: login_user, attending_status: 'attend_ok', day: Date.new(Date.current.year, i + 1, 1)
          create :attendance, user: login_user, attending_status: 'attend_late', day: Date.new(Date.current.year, i + 1, 2) if i.even?
        end
      end

      context 'when status is attend_ok' do
        subject { get :chart, params: { status: 'attend_ok' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(12)) }
      end

      context 'when status is attend_late' do
        subject { get :chart, params: { status: 'attend_late' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(6)) }
      end
    end

    context 'when filter by leaving_status' do
      before do
        12.times do |i|
          create :attendance, user: login_user, leaving_status: 'leave_ok', day: Date.new(Date.current.year, i + 1, 1)
          create :attendance, user: login_user, leaving_status: 'leave_early', day: Date.new(Date.current.year, i + 1, 2) if i.even?
        end
      end

      context 'when status is leave_ok' do
        subject { get :chart, params: { status: 'leave_ok' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(12)) }
      end

      context 'when status is leave_early' do
        subject { get :chart, params: { status: 'leave_early' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(6)) }
      end
    end

    context 'when filter by off_status' do
      before do
        12.times do |i|
          create :attendance, user: login_user, off_status: 'holiday', day: Date.new(Date.current.year, i + 1, 1)
          if i.even?
            create :attendance, user: login_user, off_status: 'weekend', day: Date.new(Date.current.year, i + 1, 2)
          else
            create :attendance, user: login_user, off_status: 'annual_leave', day: Date.new(Date.current.year, i + 1, 2)
          end
        end
      end

      context 'when status is holiday' do
        subject { get :chart, params: { status: 'holiday' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(12)) }
      end

      context 'when status is weekend' do
        subject { get :chart, params: { status: 'weekend' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(6)) }
      end
      context 'when status is annual_leave' do
        subject { get :chart, params: { status: 'annual_leave' } }
        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_attendance_chart(6)) }
      end
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
      its(:body) { is_expected.to be_json_as(Array.new(1) { response_calendar }) }
    end

    context 'when params invalid date formant' do
      let!(:attendance_1) { create :attendance, user: login_user, day: 1.day.ago }

      subject { get :calendar, params: { day: 'invalid' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(0) { response_calendar }) }
    end
  end

  describe 'POST #create' do
    context 'when attendance is created with off_status = holiday/weekend/annual_leave' do
      let!(:attendance) { create :attendance, user: login_user, off_status: 'holiday' }

      subject { post :create }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_attendance) }
    end

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

    context 'when attendance is created and checked out' do
      let(:attendance) { create :attendance, user: login_user }

      subject { patch :update, params: { id: attendance.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is created and checked in and not checked out' do
      let(:atd) { create :attendance, user: login_user, left_at: nil, leaving_status: nil }

      before { Timecop.freeze(Time.zone.local(2017, 12, 20, 16)) }

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
  end
end
