# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Attendance, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:requests).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:day) }
    it { should validate_inclusion_of(:attending_status).in_array(%w[attend_ok attend_late]).allow_nil }
    it { should validate_inclusion_of(:leaving_status).in_array(%w[leave_ok leave_early]).allow_nil }
    it { should validate_inclusion_of(:off_status).in_array(%w[annual_leave]).allow_nil }
  end

  describe '#scope' do
    context '#with_status' do
      let!(:attendance_ok) { create_list :attendance, 1, attending_status: 'attend_ok' }
      let!(:attendance) { create :attendance, attending_status: 'attend_late' }

      it 'returns attendances with status attend_ok' do
        expect(Attendance.with_status('attend_ok')).to eq(attendance_ok)
      end
    end

    context '#search_by' do
      let!(:attendance_ok) { create :attendance, attending_status: 'attend_ok', day: Date.current }
      let!(:attendance_1) { create :attendance, attending_status: 'attend_late', day: Date.current }
      let!(:attendance_2) { create :attendance, attending_status: 'attend_late', day: 1.day.ago }
      let(:params) do
        {
          status: 'attend_ok',
          from_date: Date.current.strftime('%Y-%m-%d'),
          to_date: 2.days.from_now.strftime('%Y-%m-%d')
        }
      end

      it "returns attendances with status attend_ok and day in range #{Date.current} - #{2.days.from_now}" do
        expect(Attendance.search_by(params)).to eq([attendance_ok])
      end
    end
  end
end
