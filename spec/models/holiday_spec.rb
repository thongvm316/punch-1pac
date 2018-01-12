# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Holiday, type: :model do
  describe 'associations' do
    it { should have_many(:company_holidays).dependent(:destroy) }
    it { should have_many(:companies).through(:company_holidays) }
    it { should belong_to(:admin) }
  end
end
