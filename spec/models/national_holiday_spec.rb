# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NationalHoliday, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:country) }
    it { should validate_inclusion_of(:country).in_array(%w[vietnam japan]) }
    it { should validate_presence_of(:started_at) }
    it { should validate_presence_of(:ended_at) }
  end

  describe 'associations' do
    it { should belong_to(:admin) }
  end
end
