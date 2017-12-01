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
    it { should validate_presence_of(:client_ip) }
    it { should validate_presence_of(:client_name) }
    it { should validate_presence_of(:client_os) }
    it { should validate_presence_of(:client_ua) }
    it { should validate_length_of(:client_ua).is_at_most(1000) }
  end
end
