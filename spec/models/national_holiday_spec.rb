# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NationalHoliday, type: :model do
  describe 'associations' do
    it { should belong_to(:admin) }
  end
end
