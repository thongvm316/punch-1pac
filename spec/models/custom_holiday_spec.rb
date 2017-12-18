# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomHoliday, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
  end

  describe 'validations' do
    subject { build :custom_holiday }
    it { should validate_presence_of(:started_at) }
    it { should validate_presence_of(:ended_at) }
    it { should validate_presence_of(:name) }
  end
end
