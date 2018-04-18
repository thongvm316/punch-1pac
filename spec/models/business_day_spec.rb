# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BusinessDay, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
  end

  describe 'validations' do
    it { should validate_presence_of(:weekday) }
    it { should validate_presence_of(:morning_started_at) }
    it { should validate_presence_of(:morning_ended_at) }
    it { should validate_presence_of(:afternoon_started_at) }
    it { should validate_presence_of(:afternoon_ended_at) }
    it { should validate_inclusion_of(:weekday).in_array(%w[monday tuesday wednesday thursday friday saturday sunday]) }

    it 'validate morning_started less than morning_ended' do
      subject.morning_started_at = '12:00'
      subject.morning_ended_at   = '7:50'
      subject.valid?
      expect(subject.errors[:morning_started_at]).not_to be_empty
    end

    it 'validate afternoon_started less than afternoon_ended' do
      subject.afternoon_started_at = '17:00'
      subject.afternoon_ended_at   = '13:30'
      subject.valid?
      expect(subject.errors[:afternoon_started_at]).not_to be_empty
    end
  end
end
