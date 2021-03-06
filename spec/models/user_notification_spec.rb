# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserNotification, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:activity) }
  end
end
