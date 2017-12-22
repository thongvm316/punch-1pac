# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'associations' do
    it { should have_many(:group_permissions).dependent(:destroy) }
    it { should have_many(:permissions).through(:group_permissions) }
    it { should belong_to(:company) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
  end
end