# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::BaseController, type: :controller do
  controller do
    include Authenticable

    before_action :authenticate_user!
    before_action :set_timezone
    before_action :set_locale

    def index
      head(200)
    end
  end

  describe '#authenticate_user' do
    let!(:company) { create :company }
    let(:user) { create :user, company: company }

    before { in_namespace(company) }

    context 'when user.id exists' do
      before { authenticate_user(user) }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when user.id not found' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id + 1, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index, format: :json }

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
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_expired) }
    end

    context 'when token is revoked' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
        create :jwt_blacklist, jti: jti, exp: exp
      end

      subject { get :index, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_revoked) }
    end

    context 'when token is invalid' do
      before do
        token = JWT.encode({ sub: user.id }, 'jwt_secret_key123', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :index, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_token_invalid) }
    end
  end
end
