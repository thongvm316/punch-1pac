# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  before { in_namespace(company) }

  describe 'GET #new' do
    context 'when user already logged in' do
      let(:user) { create :user, company: company }

      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      subject { get :new }

      its(:code) { is_expected.to eq '302' }
      it { is_expected.to redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') }
    end

    context 'when user do not login yet' do
      context 'when format is html' do
        subject { get :new }

        it do
          is_expected
          expect(subject).to render_template(:new)
          expect(subject.code).to eq '200'
          expect(assigns(:user)).to be_an(User)
        end
      end

      context 'when format is json' do
        subject { get :new, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
      end
    end
  end

  describe 'POST #create' do
    context 'when user already logged in' do
      let(:user) { create :user, company: company }

      before do
        jti = SecureRandom.uuid
        exp = Time.current.to_i + 2.days.to_i
        token = JWT.encode({ sub: user.id, exp: exp, jti: jti }, ENV['JWT_KEY'], 'HS256')
        request.headers['Authorization'] = "Bearer #{token}"
      end

      context 'when format is json' do
        subject { post :create, params: { user: { email: user.email, password: user.password } }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to eq '' }
      end

      context 'when when format is html' do
        subject { post :create, params: { user: { email: user.email, password: user.password } } }

        its(:code) { is_expected.to eq '302' }
        it { is_expected.to redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') }
      end
    end

    context 'when user is deactivated' do
      let(:user) { create :user, company: company, activated: false }

      context 'when format is json' do
        subject { post :create, params: { user: { email: user.email, password: user.password } }, format: :json }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when format is html' do
        subject { post :create, params: { user: { email: user.email, password: user.password } } }

        it do
          is_expected
          expect(subject.code).to eq '200'
          expect(subject).to render_template(:new)
          expect(controller).to set_flash.now[:alert]
        end
      end
    end

    context 'when email is wrong' do
      context 'when format is json' do
        subject { post :create, params: { user: { email: user.email + 'fake', password: user.password } }, format: :json }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when format is html' do
        subject { post :create, params: { user: { email: user.email + 'fake', password: user.password } } }

        it do
          is_expected
          expect(subject.code).to eq '200'
          expect(subject).to render_template(:new)
          expect(controller).to set_flash.now[:alert]
        end
      end
    end

    context 'when password is wrong' do
      context 'when format is json' do
        subject { post :create, params: { user: { email: user.email, password: user.password + 'fake' } }, format: :json }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when format is html' do
        subject { post :create, params: { user: { email: user.email, password: user.password + 'fake' } } }

        it do
          is_expected
          expect(subject.code).to eq '200'
          expect(subject).to render_template(:new)
          expect(controller).to set_flash.now[:alert]
        end
      end
    end

    context 'when email and password are correct' do
      before { request.headers['User-Agent'] = Faker::Internet.user_agent(:chrome) }

      context 'when request from mobile' do
        subject { post :create, params: { user: { email: user.email, password: user.password } }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user.merge(access_token: String)) }
        it 'track user session after login success' do
          expect { subject }.to change(Session, :count).by(1)
        end
      end

      context 'when request from browser' do
        subject { post :create, params: { user: { email: user.email, password: user.password } } }

        its(:code) { is_expected.to eq '302' }
        it do
          expect { subject }.to change(Session, :count).by(1)
          expect(subject).to redirect_to('/dashboard')
          expect(session[:access_token]).not_to be_nil
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    subject { delete :destroy }

    before { authenticate_user(user) }

    it 'should delete access_token in session' do
      is_expected
      expect(response.code).to eq '200'
      expect(response.body).to be_json_as(access_token: String)
      expect(session[:access_token]).to be_nil
    end
  end
end
