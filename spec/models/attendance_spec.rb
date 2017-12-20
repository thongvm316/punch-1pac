# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Attendance, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:requests).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:day) }
    it { should validate_inclusion_of(:attending_status).in_array(%w[attend_ok attend_late]).allow_nil }
    it { should validate_inclusion_of(:leaving_status).in_array(%w[leave_ok leave_early]).allow_nil }
    it { should validate_inclusion_of(:off_status).in_array(%w[holiday weekend annual_leave]).allow_nil }
  end
end
