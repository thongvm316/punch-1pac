# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AllowedIpsController, type: :controller do
  let(:company) { create :company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  shared_examples 'a not found allowed_ip' do
    let(:company) { create :company }
    let(:login_user) { create :user, company: company }

    its(:code) { is_expected.to eq '404' }
    its(:body) { is_expected.to be_json_as(response_404) }
  end

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      let!(:allowed_ips) { create_list :allowed_ip, 2, company: company }

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end
    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when company has allowed_ips' do
        let!(:allowed_ips) { create_list :allowed_ip, 2, company: company }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(2) { response_allowed_ip }) }
      end

      context 'when company has not allowed_ips' do
        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end

  describe 'PUT #update' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:ip_address) { Faker::Internet.ip_v4_address }
      let(:allowed_ip) { create :allowed_ip, company: company }

      subject { patch :update, params: { id: allowed_ip.id, allowed_ip: { ip_address: ip_address } } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when allowed_ip is not exists' do
        subject { patch :update, params: { id: 1 }, format: :json }

        it_behaves_like 'a not found allowed_ip'
      end

      context 'when allowed_ip is exists' do
        let(:allowed_ip) { create :allowed_ip, company: company }

        context 'when params are valid' do
          let(:ip_address) { Faker::Internet.ip_v4_address }
          subject { patch :update, params: { id: allowed_ip.id, allowed_ip: { ip_address: ip_address } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_allowed_ip) }
          it 'changes allowed_ip.ip_address' do
            is_expected
            expect(AllowedIp.find(allowed_ip.id).ip_address).to eq ip_address
          end
        end

        context 'when params are invalid' do
          subject { patch :update, params: { id: allowed_ip.id, allowed_ip: { ip_address: '' } } }

          its(:code) { is_expected.to eq '422' }
          its(:body) { is_expected.to be_json_as(response_422(ip_address: Array)) }
        end
      end
    end
  end

  describe 'POST #create' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:allowed_ip_params) { attributes_for(:allowed_ip, company: company) }

      subject { post :create, params: { allowed_ip: allowed_ip_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params are valid' do
        let(:allowed_ip_params) { attributes_for(:allowed_ip, company: company) }

        subject { post :create, params: { allowed_ip: allowed_ip_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_allowed_ip) }
      end

      context 'when params are invalid' do
        subject { post :create, params: { allowed_ip: { company_id: company.id } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(ip_address: Array)) }
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:allowed_ip) { create :allowed_ip, company: company }

      subject { delete :destroy, params: { id: allowed_ip.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when allowed_ip is not exists' do
        subject { delete :destroy, params: { id: 1 }, format: :json }

        it_behaves_like 'a not found allowed_ip'
      end

      context 'when allowed_ip is exists' do
        let(:allowed_ip) { create :allowed_ip, company: company }

        subject { delete :destroy, params: { id: allowed_ip.id } }

        its(:code) { is_expected.to eq '200' }
        it 'does not persisted anymore' do
          is_expected
          expect(AllowedIp.find_by(id: allowed_ip.id)).to be_nil
        end
      end
    end
  end
end
