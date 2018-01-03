# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AttendancesController, type: :controller do
  let(:company) { create :company, :with_business_days }
  let(:login_user) { create :user, company: company }

  before { authenticate_user(login_user) }

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
      subject { patch :update, params: { id: 1 } }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is created and not checked in yet' do
      let(:attendance) { create :attendance, user: login_user, attended_at: nil, attending_status: nil, left_at: nil, leaving_status: nil }

      subject { patch :update, params: { id: attendance.id } }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when attendance is created and checked out' do
      let(:attendance) { create :attendance, user: login_user }

      subject { patch :update, params: { id: attendance.id } }

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
