# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Announcement, type: :model do
  describe 'validations' do
    it { should validate_inclusion_of(:target).in_array(%w[everyone owners]) }
    it { should validate_inclusion_of(:status).in_array(%w[normal urgent]) }
  end
end
