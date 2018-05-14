# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:reason) }

    context 'when request.status = rejected' do
      subject { build :request, kind: :annual_leave, status: 'rejected' }

      it { should validate_length_of(:admin_reason).is_at_most(500) }
    end

    context 'when request.status != pending' do
      subject { build :request, kind: :annual_leave, status: 'approved' }

      it { should validate_presence_of(:admin) }
    end
  end
end
