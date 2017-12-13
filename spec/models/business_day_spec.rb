# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BusinessDay, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
  end

  describe 'validations' do
    it { should validate_presence_of(:started_at) }
    it { should validate_presence_of(:ended_at) }
    it { should validate_presence_of(:weekday) }
    it { should validate_inclusion_of(:weekday).in_array(%w[monday tuesday wednesday thursday friday saturday sunday]) }
  end
end
