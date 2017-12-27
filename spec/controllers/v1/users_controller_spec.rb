# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  before { authenticate_user(user) }

  describe 'GET #index' do
    context 'when company had users' do
      let!(:users) { create_list :user, 3, company: company }
      let(:current_users) { User.count }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(current_users) { response_user }) }
    end
  end

  describe 'GET #show' do
    context 'when show it self' do
      subject { get :show, params: { id: user.id } }
      let(:permissions_size) { user.permissions.size }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user(permissions_size)) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when params valid' do
      let(:test_user) { create :user, company: company }

      subject { delete :destroy, params: { id: test_user.id } }

      it 'should deleted' do
        is_expected
        expect(response.status).to eq 200
        expect(User.find_by(id: test_user.id)).to be_nil
      end
    end

    context 'when not found' do
      subject { delete :destroy, params: { id: 0 } }

      its(:code) { is_expected.to eq '404' }
    end
  end

  describe 'PATCH #update' do
    context 'when not found' do
      subject { patch :update, params: { id: 0 } }

      its(:code) { is_expected.to eq '404' }
    end

    context 'when missing user permissions attributes' do
      subject { patch :update, params: { id: user.id, user: { email: 'thoi' } } }

      its(:code) { is_expected.to eq '422' }
    end

    context 'when params valid' do
      let(:permissions) { create_list(:permission, 3).pluck(:id) }

      subject { patch :update, params: { id: user.id, user: { name: 'thoi', permission_ids: permissions } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user) }
    end

    context 'when permission invalid' do
      let(:current_pemissions_count) { user.permissions.count }
      let(:last_permission_id) { Permission.last.id }

      subject { patch :update, params: { id: user.id, user: { name: 'thoi', permission_ids: [last_permission_id + 1, last_permission_id + 2] } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user) }

      it 'should the same permission' do
        is_expected
        expect(current_pemissions_count).to eq(User.find(user.id).permissions.count)
      end
    end
  end

  describe 'POST #create_multi' do
    let!(:generates) { User.roles.each_value { |v| create_list :permission, 2, role: v } }

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

  describe 'POST #create' do
    context 'when success' do
      let(:user_params) { attributes_for(:user) }
      let!(:set_up) do
        user_params[:permission_ids] = user_params[:user_permissions_attributes].map { |id| id[:permission_id] }
        user_params.delete(:user_permissions_attributes)
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
      let(:user_params) { attributes_for(:user) }
      let(:max_permission) { Permission.last.id }
      let!(:set_up) { user_params[:permission_ids] = [max_permission + 1, max_permission + 2] }

      subject { post :create, params: { user: user_params } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(user_permissions: Array)) }
    end
  end
end
