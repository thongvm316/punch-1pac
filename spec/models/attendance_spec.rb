# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Attendance, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:requests) }
  end

  describe 'validations' do
    it { should validate_presence_of(:day) }
  end
end
