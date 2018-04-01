# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
    it { should have_many(:attendances).dependent(:destroy) }
    it { should have_many(:sessions).dependent(:destroy) }
    it { should have_many(:requests).dependent(:destroy) }
    it { should have_many(:user_groups).dependent(:destroy) }
    it { should have_many(:groups).through(:user_groups) }
    it { should have_many(:activities).dependent(:destroy) }
    it { should have_many(:user_notifications).dependent(:destroy) }
    it { should have_many(:notifications).through(:user_notifications).source(:activity) }
  end

  describe 'validations' do
    subject { build :user }
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(100) }
    it { should validate_presence_of(:email) }
    it { should validate_length_of(:email).is_at_most(100) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_presence_of(:language) }
    it { should validate_inclusion_of(:language).in_array(I18n.available_locales.map(&:to_s)) }
    # it { should validate_presence_of(:user_permissions) }
  end
end
