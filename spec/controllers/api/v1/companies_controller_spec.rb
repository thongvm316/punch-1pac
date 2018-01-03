# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CompaniesController, type: :controller do
  let(:company) { create :company }

  before { authenticate_user(login_user) }

  describe 'PATCH #update' do
    context 'when params are valid' do
      let(:params) { { company: { name: 'new_name' } } }
      context 'when login user is super admin' do
        let(:login_user) { create :user, company: company, role: 'superadmin' }
        subject { patch :update, params: params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
        it 'changes company.name' do
          is_expected
          expect(Company.find(company.id).name).to eq 'new_name'
        end
      end

      context 'when login user is admin' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        subject { patch :update, params: params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
        it 'changes company.name' do
          is_expected
          expect(Company.find(company.id).name).to eq 'new_name'
        end
      end

      context 'when login user is member' do
        let(:login_user) { create :user, company: company, role: 'member' }

        subject { patch :update, params: params }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when params are invalid' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { patch :update, params: { company: { name: '' } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
    end
  end

  describe 'POST #setup_rules' do
    context 'when params are valid' do
      let(:params) { { company: { breakdays: %w[saturday sunday] } } }
      context 'when login user is admin' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        subject { patch :setup_rules, params: params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
        it 'changes company.name' do
          is_expected
          expect(Company.find(company.id).breakdays).to eq %w[sunday saturday]
        end
      end

      context 'when login user is member' do
        let(:login_user) { create :user, company: company, role: 'member' }
        subject { patch :setup_rules, params: params }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when params are invalid' do
      let(:company) { create :company, timezone: 'Asia/Tokyo', breakdays: ['sunday'], breaktime: 1.5 }
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { patch :setup_rules, params: { company: { breakdays: 10, breaktime: {}, timezone: '' } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(timezone: Array)) }
    end
  end

  describe 'PATCH #deactivate' do
    context 'when superadmin do' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      subject { patch :deactivate }

      its(:code) { is_expected.to eq '200' }
      it 'is deactivated' do
        is_expected
        expect(Company.find_by(id: company.id).activated).to be_falsey
      end
    end

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { patch :deactivate }

      its(:code) { is_expected.to eq '401' }
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }
      subject { delete :destroy }

      its(:code) { is_expected.to eq '200' }
      it 'does not persisted anymore' do
        is_expected
        expect(Company.find_by(id: company.id)).to be_nil
      end
    end

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { patch :destroy }

      its(:code) { is_expected.to eq '401' }
    end
  end
end
