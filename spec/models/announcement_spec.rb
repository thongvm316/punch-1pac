# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Announcement, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:due_date) }
    it { should validate_presence_of(:content) }
  end

  describe 'associations' do
    it { should belong_to(:admin) }
  end
end
