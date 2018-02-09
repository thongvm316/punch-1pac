# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::GroupsController, type: :controller do
  let(:company) { create :company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      subject { get :index }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let!(:groups) do
        admin_user = create(:user, role: 'admin', company: company)
        member_user = create(:user, role: 'member', company: company)
        create_list :group, 3, company: company, users: [admin_user, member_user]
      end

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(groups.size) { response_group(2) }) }
    end
  end

  describe 'GET #show' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { get :show, params: { id: group.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params are valid ' do
        let(:group) { create :group, company: company, users: create_list(:user, 3, company: company) }
        let(:permissions_size) { group.permissions.size }

        subject { get :show, params: { id: group.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_group(3)) }
      end

      context 'when invalid params' do
        subject { get :show, params: { id: 0 }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end
    end
  end

  describe 'POST #create' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:group_params) do
        group_params = attributes_for(:group)
        group_params[:permission_ids] = group_params[:group_permissions_attributes].map { |id| id[:permission_id] }
        group_params.delete(:group_permissions_attributes)
        group_params
      end

      subject { post :create, params: { group: group_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params are valid' do
        let(:group_params) do
          group_params = attributes_for(:group)
          group_params[:permission_ids] = group_params[:group_permissions_attributes].map { |id| id[:permission_id] }
          group_params.delete(:group_permissions_attributes)
          group_params
        end

        subject { post :create, params: { group: group_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_group(0)) }
      end

      context 'when have no permissions' do
        let(:group_params) do
          group_params = attributes_for(:group).except(:group_permissions_attributes)
          last_permission = Permission.last.id
          group_params[:permission_ids] = [last_permission + 1, last_permission + 2]
          group_params
        end

        subject { post :create, params: { group: group_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_group(0)) }
      end
    end
  end

  describe 'PATCH #update' do
    let(:group) { create :group, company: company, users: create_list(:user, 3, company: company) }
    let(:group_params) { { id: group.id, group: { name: 'kawasaki', permission_ids: [] } } }

    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { patch :update, params: group_params }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when add new permissions' do
        let(:permissions_adding) { create_list :permission, 3 }
        let(:ids) { group.permissions.pluck(:id).concat(permissions_adding.pluck(:id)) }
        let!(:set_up) { group_params[:group][:permission_ids] = ids }

        subject { patch :update, params: group_params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_group(3)) }
      end

      context 'when permissions empty' do
        let!(:set_up) { group_params[:group][:permission_ids] = [] }
        let(:current_permissions_in_group) { group.permissions.count }

        subject { put :update, params: group_params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_group(3)) }
      end

      context 'when permissions invalid' do
        let!(:set_up) { group_params[:group][:permission_ids] = [0] }
        let(:current_permissions_in_group) { group.permissions.count }

        subject { put :update, params: group_params }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_group(current_permissions_in_group)) }
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:group) { create :group, company: company }

    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { delete :destroy, params: { id: group.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid params' do
        subject { delete :destroy, params: { id: group.id } }

        its(:code) { is_expected.to eq '200' }
      end
    end
  end

  shared_examples 'group_id or user_id is not found' do
    let(:group) { create :group, company: company }

    context 'when user_id is not found' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { post :add_user, params: { id: group.id, user_id: nil }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when group_id is not found' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { post :add_user, params: { id: group.id + 99, user_id: login_user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end
  end

  describe 'POST #add_user' do
    it_behaves_like 'group_id or user_id is not found'

    context 'when login_user = member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user] }

      subject { post :add_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user = admin' do
      context 'when login_user not in target_group' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'member' }
        let(:group) { create :group, company: company, users: [login_user] }
        let!(:other_group) { create :group, company: company }

        subject { post :add_user, params: { id: other_group.id, user_id: target_user.id }, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(response_401) }
      end

      context 'when target_user is member' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'member' }
        let(:group) { create :group, company: company, users: [login_user] }

        context 'when user already in a group' do
          let!(:other_group) { create :group, company: company, users: [target_user] }

          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '401' }
          its(:body) { is_expected.to be_json_as(response_401) }
        end

        context 'when user is not in a group' do
          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should change user group' do
            is_expected
            expect(target_user.groups.first).to eq group
          end
        end
      end

      context 'when target_user is admin' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'admin' }
        let(:group) { create :group, company: company, users: [login_user] }

        context 'when user already in a group' do
          let!(:other_group) { create :group, company: company, users: [target_user] }

          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should add user new group' do
            is_expected
            expect(target_user.groups).to include(other_group, group)
          end
        end

        context 'when user is not in a group' do
          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should add user new group' do
            is_expected
            expect(target_user.groups.first).to eq group
          end
        end
      end
    end
  end

  describe 'DELETE #remove_user' do
    it_behaves_like 'group_id or user_id is not found'

    context 'when login_user not in target_group' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { post :remove_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user.groups includes target_group but target_user not in target_group' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user] }

      subject { post :remove_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when params are valid' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user, target_user] }

      subject { delete :remove_user, params: { id: group.id, user_id: target_user.id } }

      its(:code) { is_expected.to eq '200' }
      it 'should remove user group' do
        is_expected
        target_user.reload
        expect(target_user.groups).to eq []
      end
    end
  end
end
