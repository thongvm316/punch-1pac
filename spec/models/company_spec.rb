# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'associations' do
    it { should have_many(:users).dependent(:destroy) }
    it { should have_many(:allowed_ips).dependent(:destroy) }
    it { should have_many(:business_days).dependent(:destroy) }
    it { should have_many(:company_holidays).dependent(:destroy) }
    it { should have_many(:holidays).through(:company_holidays) }
    it { should have_many(:groups) }
  end

  describe 'validations' do
    subject { build :company }
    it { should validate_presence_of(:namespace) }
    it { should validate_uniqueness_of(:namespace) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:country) }
    it { should validate_presence_of(:industry) }
    it { should validate_presence_of(:address) }
    it { should validate_presence_of(:phone_number) }
  end
end
