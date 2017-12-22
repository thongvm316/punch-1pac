# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::GroupsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }
  let(:permissions) { create_list :permission, 3 }
  let(:permission_ids) { permissions.pluck(:id).map { |id| { permission_id: id } } }

  before { authenticate_user(login_user) }

  describe 'GET #index' do
    let!(:groups) { create_list :group, 3, company_id: company.id, group_permissions_attributes: permission_ids }
    context 'when valid params' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(permission_ids.size) { response_group(permissions.size) }) }
    end
  end

  describe 'GET #show' do
    context 'when valid params' do
      let!(:group) { create :group, company_id: company.id, group_permissions_attributes: permission_ids }

      subject { get :show, params: { id: group.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_group(permissions.size)) }
    end

    context 'when invalid params' do
      subject { get :show, params: { id: 0 } }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end
  end

  describe 'POST #create' do
    context 'when params valid' do
      let(:permission) { create_list :permission, 3 }
      let(:ids) { permission.pluck(:id) }

      subject { post :create, params: { group: { name: Faker::Lorem.word, group_permissions_attributes: ids } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_group(ids.size)) }
    end

    context 'when have no permission' do
      subject { post :create, params: { group: { name: Faker::Lorem.word, permission: [1, 2, 3] } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(group_permissions: Array)) }
    end
  end

  describe 'PATCH #update' do
    let!(:permissions_adding) { create_list :permission, 3 }
    let(:ids) { permissions.pluck(:id).concat(permissions_adding.pluck(:id)) }
    let!(:group) { create :group, company_id: company.id, group_permissions_attributes: permission_ids }

    context 'when params valid' do
      subject { put :update, params: { id: group.id, group: { name: Faker::Lorem.word, group_permissions_attributes: ids } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_group(ids.size)) }
    end

    context 'when invalid params' do
      subject { put :update, params: { id: group.id, group: { name: '', group_permissions_attributes: [] } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(name: Array, group_permissions: Array)) }
    end

    context 'when permissions invalid' do
      subject { put :update, params: { id: group.id, group: { name: 'kawasaki', group_permissions_attributes: [0] } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(group_permissions: Array)) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when valid params' do
      let!(:permissions) { create_list :permission, 10 }
      let(:permission_ids) { permissions.map { |p| { permission_id: p.id } } }
      let!(:group) { create :group, company_id: company.id, group_permissions_attributes: permission_ids }

      subject { delete :destroy, params: { id: group.id } }

      its(:code) { is_expected.to eq '200' }
    end
  end
end
