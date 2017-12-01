# frozen_string_literal: true

require 'rails_helper'

RSpec.describe JwtBlacklist, type: :model do
  describe 'validations' do
    subject { build :jwt_blacklist }
    it { should validate_presence_of(:jti) }
    it { should validate_uniqueness_of(:jti) }
    it { should validate_presence_of(:exp) }
  end
end
