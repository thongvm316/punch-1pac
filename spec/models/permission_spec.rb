# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Permission, type: :model do
  describe 'associations' do
    it { should have_many(:group_permissions).dependent(:destroy) }
    it { should have_many(:groups).through(:group_permissions) }
  end

  describe 'validations' do
    it { should validate_presence_of(:role) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:action) }
    it { should validate_presence_of(:controller) }
  end
end
