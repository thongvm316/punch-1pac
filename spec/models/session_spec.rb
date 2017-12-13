# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    subject { build :session }
    it { should validate_presence_of(:jti) }
    it { should validate_uniqueness_of(:jti) }
    it { should validate_presence_of(:exp) }
    it { should validate_presence_of(:ip_address) }
    it { should validate_presence_of(:device_type) }
    it { should validate_presence_of(:os) }
    it { should validate_presence_of(:user_agent) }
    it { should validate_length_of(:user_agent).is_at_most(1000) }
  end
end
