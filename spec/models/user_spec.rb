# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
    it { should belong_to(:group) }
    it { should belong_to(:department) }
    it { should have_many(:attendances).dependent(:destroy) }
    it { should have_many(:sessions).dependent(:destroy) }
    it { should have_many(:requests).dependent(:destroy) }
  end

  describe 'validations' do
    subject { build :user }
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(100) }
    it { should validate_presence_of(:email) }
    it { should validate_length_of(:email).is_at_most(100) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_inclusion_of(:gender).in_array(%w[male female]) }
    it { should validate_inclusion_of(:language).in_array(%w[vi en jp]) }
    it { should validate_presence_of(:user_permissions) }
  end
end
