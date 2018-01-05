# frozen_string_literal: true

require 'rails_helper'

describe RequestPolicy do
  let(:company) { create :company }
  subject { described_class }

  context 'when user is member' do
    let(:req) { create :request, user: user }
    let(:user) { create :user, company: company, role: 'member' }

    permissions :index?, :create?, :update?, :destroy? do
      it { expect(subject).to permit(user, req) }
    end

    permissions :approve?, :reject? do
      it { expect(subject).not_to permit(user, req) }
    end
  end

  context 'when user is admin' do
    let(:req) { create :request, user: user }
    let(:user) { create :user, company: company, role: 'admin' }

    permissions :create?, :update?, :destroy?, :index?, :approve?, :reject? do
      it { expect(subject).to permit(user, req) }
    end
  end

  context 'when request not pending' do
    let(:user) { create :user, company: company, role: 'admin' }
    let(:req) { create :request, user: user, status: 'approved' }
    permissions :update?, :destroy? do
      it 'user can not update & destroy' do
        expect(subject).not_to permit(user, req)
      end
    end
  end

  context 'when request is not belongs to current user' do
    let(:user) { create :user, company: company }
    let(:req) { create :request }
    permissions :update?, :destroy? do
      it 'user can not update & destroy' do
        expect(subject).not_to permit(user, req)
      end
    end
  end
end
