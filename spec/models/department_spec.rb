# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Department, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
    it { should have_many(:users).dependent(:nullify) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
  end
end
