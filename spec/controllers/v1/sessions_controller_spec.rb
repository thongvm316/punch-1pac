# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::SessionsController, type: :controller do
  let(:user) { create :user, email: 'foo@gmail.com', password: 'password', password_confirmation: 'password' }

  describe 'POST #create' do
    context 'when email is wrong' do
      subject { post :create, params: { email: user.email + 'fake', password: user.password } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when password is wrong' do
      subject { post :create, params: { email: user.email, password: user.password + 'fake' } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when email and password are correct' do
      subject { post :create, params: { email: user.email, password: user.password } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(token: String) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when token is valid' do
      subject { delete :destroy }

      before { authenticate_user(user) }

      its(:code) { is_expected.to eq '200' }
    end
  end
end
