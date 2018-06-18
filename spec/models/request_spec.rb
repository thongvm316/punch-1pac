# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:reason) }

    context 'when request.status = rejected' do
      subject { build :request, kind: :annual_leave, status: 'rejected' }

      it { should validate_presence_of(:admin_reason) }
      it { should validate_length_of(:admin_reason).is_at_most(500) }
    end

    context 'when request.status != pending' do
      subject { build :request, kind: :annual_leave, status: 'approved' }

      it { should validate_presence_of(:admin) }
    end

    context 'when request.kind = annual_leave and request.attendance_day is punched' do
      let!(:attendance) { create :attendance, user: create(:user) }

      subject { build :request, kind: :annual_leave, attendance_day: attendance.day, status: 'pending' }

      it do
        expect(subject.valid?).to be_falsey
        expect(subject.errors.messages.to_json).to be_json_including(attendance_day: Array)
      end
    end
  end
end
