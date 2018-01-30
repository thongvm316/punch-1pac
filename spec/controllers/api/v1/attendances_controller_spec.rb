# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:company) { create :company, :with_business_days }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    context 'when have search params' do
      let(:params) do
        {
          status: 'attend_ok',
          from_date: Date.current,
          to_date: 2.days.from_now
        }
      end
      let!(:attend_ok) { create :attendance, attending_status: 'attend_ok', day: Date.current }
      let!(:attendance_1) { create :attendance, day: Date.current }
      let!(:attendance_2) { create :attendance, day: 1.day.from_now }

      subject { get :index, params: params }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(1) { response_attendance }, meta: response_pagination) }
    end

    context 'when have no search params' do
      let!(:attendances) { create_list :attendance, 3, day: 5.days.ago }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(attendances: Array.new(3) { response_attendance }, meta: response_pagination) }
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
