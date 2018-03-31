# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Activity, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:activitable) }
    it { should have_many(:user_notifications).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:kind) }
    it { should validate_inclusion_of(:kind).in_array(Activity::ACTION_KINDS.values.flatten.uniq) }
  end
end
