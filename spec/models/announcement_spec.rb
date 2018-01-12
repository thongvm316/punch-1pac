# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Announcement, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:content) }
  end
end
