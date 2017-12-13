# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  describe 'GET #index' do
    before { authenticate_user(user) }

    context 'when company had users' do
      subject { get :index }
      it 'should return users' do
        is_expected

        expect(response.status).to eq 200
        expect(response.body).to be_json_as(Array)
      end
    end
  end

  describe 'DELETE #destroy' do
    before { authenticate_user(user) }

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
      subject { delete :destroy, params: { id: -1 } }

      its(:code) { is_expected.to eq '404' }
    end
  end

  describe 'PATCH #update' do
    context 'when not found' do
      before { authenticate_user(user) }

      subject { patch :update, params: { id: -1 } }

      its(:code) { is_expected.to eq '404' }
    end
    context 'when invalid params' do
      before { authenticate_user(user) }

      subject { patch :update, params: { id: user.id, user: { email: 'thoi' } } }

      its(:code) { is_expected.to eq '422' }
    end

    context 'when params valid' do
      before { authenticate_user(user) }

      subject { patch :update, params: { id: user.id, user: { name: 'thoi' } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user) }
    end
  end

  describe 'POST #create_multi' do
    let(:company) { create :company }
    let(:user) { create :user, company: company }

    before { authenticate_user(user) }

    context 'when valid csv file' do
      let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

      subject { post :create_multi, params: { csv_file: csv_file } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(users: Array.new(3) { response_user }, errors: { lines: [] }) }
    end

    context 'when failed some' do
      let(:csv_file) { fixture_file_upload('files/invalid_at_line_2.csv', 'text/csv') }

      subject { post :create_multi, params: { csv_file: csv_file } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(users: Array.new(2) { response_user }, errors: { lines: Array }) }
    end

    context 'when failed all' do
      let(:csv_file) { fixture_file_upload('files/invalid_all.csv', 'text/csv') }

      subject { post :create_multi, params: { csv_file: csv_file } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(users: [], errors: { lines: Array }) }
    end
  end

  describe 'POST #create' do
    before { authenticate_user(user) }

    context 'when success' do
      let(:valid_params) do
        password = Faker::Internet.password
        {
          name: Faker::Name.name,
          email: Faker::Internet.email,
          password: password,
          password_confirmation: password
        }
      end

      subject { post :create, params: { user: valid_params } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user) }
    end

    context 'when fails validation' do
      let(:params) { { username: '' } }
      let(:error) do
        {
          password: Array,
          name:     Array,
          email:    Array
        }
      end

      subject { post :create, params: { user: params } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(error)) }
    end
  end
end
