# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CompanyHoliday, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
    it { should belong_to(:holiday) }
  end
end
