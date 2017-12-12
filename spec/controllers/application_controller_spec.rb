# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  controller do
    include JWTAuthenticable

    before_action :authenticate_user

    def index
      head(200)
    end
  end

  describe '#authenticate_user' do
    let(:user) { create :user }

    context 'when user.id exists' do
      before { authenticate_user(user) }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when user.id not found' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id + 1, exp: exp, jti: jti }, 'jwt_secret_key', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when token is valid' do
      before { authenticate_user(user) }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when token is expired' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i - 10
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, 'jwt_secret_key', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_expired) }
    end

    context 'when token is revoked' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, 'jwt_secret_key', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
        create :jwt_blacklist, jti: jti, exp: exp
      end

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_revoked) }
    end

    context 'when token is invalid' do
      before do
        token = JWT.encode({ sub: user.id }, 'jwt_secret_key123', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_invalid) }
    end
  end
end