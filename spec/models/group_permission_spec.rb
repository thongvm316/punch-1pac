# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GroupPermission, type: :model do
  describe 'associations' do
    it { should belong_to(:permission) }
    it { should belong_to(:group) }
  end
end
