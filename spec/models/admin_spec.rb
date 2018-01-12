# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin, type: :model do
  describe 'associations' do
    it { should have_many(:announcements) }
    it { should have_many(:holidays) }
  end
end
