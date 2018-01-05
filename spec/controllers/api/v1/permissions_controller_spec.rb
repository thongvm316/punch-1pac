# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PermissionsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when get all permission' do
        let!(:permissions) { create_list :permission, 5 }
        let(:total_permissions) { Permission.count }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }

        its(:body) { is_expected.to be_json_as(Array.new(total_permissions) { response_permission }) }
      end

      context 'when filter by role' do
        let!(:permissions_role_1) { create_list :permission, 5, role: 3 }
        let!(:permissions_role_2) { create_list :permission, 5, role: 4 }

        context 'when role = 3' do
          subject { get :index, params: { role: 3 } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(Array.new(permissions_role_1.count) { response_permission }) }
        end

        context 'when role = 4' do
          subject { get :index, params: { role: 4 } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(Array.new(permissions_role_2.count) { response_permission }) }
        end
      end
    end
  end
end
