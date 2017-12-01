# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AllowedIp, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
  end

  describe 'validations' do
    it { should validate_presence_of(:ip_address) }
  end
end
