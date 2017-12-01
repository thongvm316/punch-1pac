# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Announcement, type: :model do
  describe 'validations' do
    it { should validate_inclusion_of(:send_type).in_array(%w[all owners]) }
    it { should validate_inclusion_of(:send_status).in_array(%w[sending sent]) }
    it { should validate_inclusion_of(:status).in_array(%w[normal urgent]) }
  end
end
