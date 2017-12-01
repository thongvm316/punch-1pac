# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:attendance) }
  end

  describe 'validations' do
    it { should validate_presence_of(:reason) }
    it { should validate_length_of(:reason).is_at_most(500) }
    it { should validate_inclusion_of(:status).in_array(%w[pending approved rejected]) }
  end
end
