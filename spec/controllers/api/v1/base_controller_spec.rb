# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::BaseController, type: :controller do
  controller do
    include Authenticable

    before_action :authenticate_user!
    before_action :set_timezone
    before_action :set_locale
    skip_after_action :verify_authorized

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

    context 'when user is deactivated' do
      let(:user) { create :user, company: company, activated: false }

      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      context 'when format is json' do
        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(message: I18n.t('auth.messages.deactivated_user'), code: String) }
      end

      context 'when format is html' do
        subject { get :index }

        it { is_expected.to redirect_to(login_url) }
      end
    end

    context 'when user.id not found' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id + 1, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      context 'when format is json' do
        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(message: I18n.t('auth.messages.unauthorized'), code: String) }
      end

      context 'when format is html' do
        subject { get :index }

        it { is_expected.to redirect_to(login_url) }
      end
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

      context 'when format is json' do
        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(message: I18n.t('auth.messages.access_token_expired'), code: String) }
      end

      context 'when format is html' do
        subject { get :index }

        it { is_expected.to redirect_to(login_url) }
      end
    end

    context 'when token is revoked' do
      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
        create :jwt_blacklist, jti: jti, exp: exp
      end

      context 'when format is json' do
        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(message: I18n.t('auth.messages.access_token_revoked'), code: String) }
      end

      context 'when format is html' do
        subject { get :index }

        it { is_expected.to redirect_to(login_url) }
      end
    end

    context 'when token is invalid' do
      before do
        token = JWT.encode({ sub: user.id }, 'jwt_secret_key123', 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      context 'when format is json' do
        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(message: I18n.t('auth.messages.access_token_invalid'), code: String) }
      end

      context 'when format is html' do
        subject { get :index }

        it { is_expected.to redirect_to(login_url) }
      end
    end
  end

  describe '#ip_address_user' do
    let(:company) { create :company, :with_default_group, app_blocked_by_ip: true }
    let(:login_usr) { create :user, company: company, role: 'member' }

    before do
      in_namespace(company)
      authenticate_user(login_usr)
      request.remote_ip = '192.168.1.1'
    end

    context 'when app_blocker_by_ip is true' do
      context ' when ip address not exists in allowed_ip' do
        let(:session) { create :session, user: login_usr }
        let!(:allowed_ip1) { create :allowed_ip, ip_address: '10.0.0.1', company: company }

        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '403' }
        its(:body) { is_expected.to include(I18n.t('auth.messages.ip_address_block')) }
      end

      context 'when response render format html' do
        subject { get :index, format: :html }

        it { expect(subject).to be_forbidden }
        it {  expect(subject).to render_template('pages/page_403') }
      end

      context 'when ip address exists allowed_ip' do
        let(:session) { create :session, user: login_usr }
        let!(:allowed_ip2) { create :allowed_ip, ip_address: '192.168.1.1', company: company }

        subject { get :index, format: :json }

        its(:code) { is_expected.to eq '200' }
      end
    end

    context 'when app_blocked_by_ip is false' do
      let!(:company) { create :company, :with_default_group, app_blocked_by_ip: false }

      subject { get :index, format: :json }

      its(:code) { is_expected.to eq '200' }
    end
  end
end
