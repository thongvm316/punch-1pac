# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  describe 'index' do
    before { authenticate_user(user) }

    context 'when success' do
      subject { get :index }
      it do
        is_expected
        expect(response.status).to eq 200
      end
    end
  end

  describe 'delete' do
    before { authenticate_user(user) }

    context 'when success' do
      let(:test_user) { create :user, company: company }

      subject { delete :destroy, params: { id: test_user.id } }

      it do
        is_expected
        expect(response.status).to eq 200
        expect(User.find_by(id: test_user.id)).to be_nil
      end
    end

    context 'when failed' do
      subject { delete :destroy, params: { id: -1 } }

      it do
        is_expected
        expect(response.status).to eq 404
      end
    end
  end

  describe 'update' do
    context 'when failed' do
      before { authenticate_user(user) }

      subject { patch :update, params: { id: -1 } }

      it do
        is_expected
        expect(response.status).to eq 404
      end
    end
    context 'when fail' do
      before { authenticate_user(user) }

      subject { patch :update, params: { id: user.id, user: { name: 'thoi' } } }
      it do
        is_expected
        expect(response.status).to eq 200
      end
    end
  end

  describe '.create' do
    let(:company) { create :company }
    let(:user) { create :user, company: company }

    describe 'import_csv' do
      before { authenticate_user(user) }

      context 'when success' do
        let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

        subject { post :import_csv, params: { csv_file: csv_file } }

        it do
          is_expected
          expect(response.status).to eq 200
          expect(response.body).to be_json_as(response_users_success_all(3))
        end
      end

      context 'when failed some' do
        let(:csv_file) { fixture_file_upload('files/invalid_at_line_2.csv', 'text/csv') }

        subject { post :import_csv, params: { csv_file: csv_file } }

        it do
          is_expected
          expect(response.status).to eq 200
          expect(response.body).to be_json_as(response_users_success_some(2))
        end
      end

      context 'when failed all' do
        let(:csv_file) { fixture_file_upload('files/invalid_all.csv', 'text/csv') }

        subject { post :import_csv, params: { csv_file: csv_file } }

        it do
          is_expected
          expect(response.status).to eq 200
          expect(response.body).to be_json_as(response_users_success_some(0))
        end
      end
    end

    describe 'create user' do
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

        it do
          is_expected
          expect(response.status).to eq 200
          expect(response.body).to be_json_as(response_user)
        end
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

        it do
          is_expected
          expect(response.status).to eq 422
          expect(response.body).to be_json_as(response_422(error))
        end
      end
    end
  end
end
