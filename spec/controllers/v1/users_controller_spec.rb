# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before { authenticate_user(login_user) }

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      context 'when company had users' do
        let!(:users) { create_list :user, 3, company: company }
        let(:current_users) { User.count }
        let(:login_user) { create :user, company: company, role: 'admin' }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(current_users) { response_user }) }
      end
    end
  end

  describe 'GET #show' do
    context 'when login user is member' do
      let(:user) { create :user, company: company, role: 'member' }

      context 'when show himself' do
        let(:permissions_number) { login_user.permissions.size }

        subject { get :show, params: { id: login_user.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user(permissions_number)) }
      end

      context 'when show the other one' do
        subject { get :show, params: { id: user.id } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:user) { create :user, company: company, role: 'admin' }
      let(:permissions_number) { user.permissions.size }

      subject { get :show, params: { id: user.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user(permissions_number)) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:target_user) { create :user, company: company }

      subject { delete :destroy, params: { id: target_user.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when target user is member' do
        let(:target_user) { create :user, company: company, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }

        subject { delete :destroy, params: { id: target_user.id } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user not found' do
        subject { delete :destroy, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end
    end

    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when target user is member' do
        let(:target_user) { create :user, company: company, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is super admin' do
        let(:target_user) { create :user, company: company, role: 'superadmin' }

        subject { delete :destroy, params: { id: target_user.id } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user not found' do
        subject { delete :destroy, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end
    end
  end

  describe 'PATCH #update' do
    let(:target_user) { create :user, company: company, role: 'member' }

    context 'when login user is member' do
      context 'when update itself' do
        let(:login_user) { target_user }
        let(:permissions_number) { target_user.permissions.count }

        context 'when add permissions' do
          let(:permissions) { create_list(:permission, 3).pluck(:id) }

          subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_user(permissions_number)) }
        end

        context 'when update without permission' do
          subject { patch :update, params: { id: target_user.id, user: { name: 'thoi' } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_user(permissions_number)) }
        end
      end

      context 'when update the other user' do
        let(:login_user) { create :user, company: company, role: 'member' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user is super admin' do
        let(:target_user) { create :user, company: company, role: 'superadmin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user not found' do
        subject { patch :update, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end

      context 'when missing user permission ids params' do
        subject { patch :update, params: { id: target_user.id, user: { email: 'thoi' } } }

        its(:code) { is_expected.to eq '422' }
      end

      context 'when params valid' do
        let(:permissions) { create_list(:permission, 5).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user(permissions.size)) }
      end

      context 'when permission invalid' do
        let(:last_permission_id) { Permission.last.id }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: [last_permission_id + 1, last_permission_id + 2] } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(user_permissions: Array)) }
      end
    end

    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user(permissions.size)) }
      end

      context 'when target user is member' do
        let(:target_user) { create :user, company: company, role: 'member' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user(permissions.size)) }
      end

      context 'when target user is super admin' do
        let(:target_user) { create :user, company: company, role: 'superadmin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end
    end
  end

  describe 'POST #create_multi' do
    let!(:generates) { User.roles.each_value { |v| create_list :permission, 2, role: v } }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

      subject { post :create_multi, params: { csv_file: csv_file } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid csv file' do
        let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: Array.new(3) { response_user }, errors: { lines: [] }) }
      end

      context 'when csv file empty' do
        let(:csv_file) { fixture_file_upload('files/empty.text', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(csv_file: Array)) }
      end

      context 'when failed some lines' do
        let(:csv_file) { fixture_file_upload('files/invalid_at_line_2.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: Array.new(2) { response_user }, errors: { lines: Array }) }
      end

      context 'when failed all' do
        let(:csv_file) { fixture_file_upload('files/invalid_all.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: [], errors: { lines: Array }) }
      end
    end
  end

  describe 'POST #create' do
    let(:user_params) { attributes_for(:user) }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :create, params: { user: user_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params validate' do
        let(:user_params) do
          user_params = attributes_for(:user)
          user_params[:permission_ids] = user_params[:user_permissions_attributes].map { |id| id[:permission_id] }
          user_params.delete(:user_permissions_attributes)
          user_params
        end

        subject { post :create, params: { user: user_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_user) }
      end

      context 'when params empty' do
        let(:params) { { username: '', permissions_ids: [] } }
        let(:error) do
          {
            password:   Array,
            name:       Array,
            email:      Array,
            user_permissions: Array
          }
        end

        subject { post :create, params: { user: params } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(error)) }
      end

      context 'when permissions invalid' do
        let(:user_params) do
          user_params = attributes_for(:user).except(:user_permissions_attributes)
          max_permission_number = Permission.last.id
          user_params[:permission_ids] = [max_permission_number + 1, max_permission_number + 2]
          user_params
        end

        subject { post :create, params: { user: user_params } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(user_permissions: Array)) }
      end
    end
  end
end
