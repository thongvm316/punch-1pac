# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'associations' do
    it { should have_many(:group_permissions).dependent(:destroy) }
    it { should have_many(:permissions).through(:group_permissions) }
    it { should belong_to(:company) }
    it { should have_many(:user_groups).dependent(:destroy) }
    it { should have_many(:users).through(:user_groups) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    # it { should validate_presence_of(:group_permissions) }
  end

  describe '#pending_requests' do
    let(:company) { create :company, :with_business_days }
    let(:groups) { create_list :group, 2, company: company }
    let(:login_user) { create :user, company: company, groups: [groups.first], role: 'admin' }

    context 'when user in group and request status is pending' do
      let!(:requests) { create_list :request, 11, status: :pending, user: create(:user, company: company, groups: [groups.first]) }

      subject { login_user.groups.pending_requests }
      it do
        is_expected
        expect(subject.to_json).to be_json_as(Array.new(1) { response_pending_request })
      end
    end

    context 'when user in group and request status not pending' do
      let!(:requests) { create_list :request, 11, status: :approved, admin: login_user, user: create(:user, company: company, groups: [groups.first]) }

      subject { login_user.groups.pending_requests }
      it do
        is_expected
        expect(subject).to eq []
      end
    end

    context 'when user not belong in group' do
      let(:login_usr) { create :user, company: company, role: 'admin' }
      let!(:requests) { create_list :request, 11, status: :approved, admin: login_usr, user: create(:user, company: company, groups: [groups.first]) }

      subject { login_usr.groups.pending_requests }
      it do
        is_expected
        expect(subject).to eq []
      end
    end
  end
end
