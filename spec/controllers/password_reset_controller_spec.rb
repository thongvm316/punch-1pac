# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PasswordResetController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  before { in_namespace(company) }

  describe 'GET #new' do
    subject { get :new }
    its(:code) { is_expected.to eq '200' }
    it { is_expected.to render_template(:new) }
  end

  describe 'POST #create' do
    context 'when email is invalid' do
      context 'when request format is json' do
        subject { post :create, params: { user: { email: user.email + 'fake' } }, format: :json }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(message: String) }
      end

      context 'when request format is html' do
        subject { post :create, params: { user: { email: user.email + 'fake' } } }

        it do
          is_expected
          expect(response.code).to eq '200'
          expect(subject).to render_template(:new)
          expect(flash[:alert]).to be_truthy
        end
      end
    end

    context 'when email is valid' do
      context 'when request format is json' do
        subject { post :create, params: { user: { email: user.email } }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to eq '' }
      end

      context 'when request format is html' do
        subject { post :create, params: { user: { email: user.email } } }

        it do
          is_expected
          expect(flash[:notice]).to be_truthy
          expect(subject).to redirect_to(login_url)
        end
      end
    end
  end

  describe 'GET #edit' do
    let(:token) { SecureRandom.base58(24) }

    context 'when reset_password_token is expired' do
      let!(:user) { create :user, company: company, reset_password_token: token, reset_password_sent_at: Time.current - 1.hour }

      subject { get :edit, params: { token: token } }

      it do
        is_expected
        expect(subject).to redirect_to(password_reset_url)
        expect(flash[:alert]).to be_truthy
      end
    end

    context 'when reset_password_token is invalid' do
      let!(:user) { create :user, company: company, reset_password_token: token + 'hehe', reset_password_sent_at: Time.current }

      subject { get :edit, params: { token: token } }

      it do
        is_expected
        expect(subject).to redirect_to(password_reset_url)
        expect(flash[:alert]).to be_truthy
      end
    end

    context 'when reset_password_token is valid' do
      let!(:user) { create :user, company: company, reset_password_token: token, reset_password_sent_at: Time.current }

      subject { get :edit, params: { token: token } }

      it do
        is_expected
        expect(response.code).to eq '200'
        expect(subject).to render_template(:edit)
        expect(assigns(:user)).to eq user
      end
    end
  end

  describe 'PATCH #update' do
    let(:token) { SecureRandom.base58(24) }

    context 'when reset_password_token is expired' do
      let!(:user) { create :user, company: company, reset_password_token: token, reset_password_sent_at: Time.current - 1.hour }

      subject { post :update, params: { token: token } }

      it do
        is_expected
        expect(subject).to redirect_to(password_reset_url)
        expect(flash[:alert]).to be_truthy
      end
    end

    context 'when reset_password_token is invalid' do
      let!(:user) { create :user, company: company, reset_password_token: token + 'hehe', reset_password_sent_at: Time.current }

      subject { post :update, params: { token: token } }

      it do
        is_expected
        expect(subject).to redirect_to(password_reset_url)
        expect(flash[:alert]).to be_truthy
      end
    end

    context 'when password and password_confirmation are valid' do
      let!(:user) { create :user, company: company, reset_password_token: token, reset_password_sent_at: Time.current }

      subject { post :update, params: { user: { password: 'gamegame', password_confirmation: 'gamegame' }, token: token } }

      it do
        is_expected
        expect(subject).to redirect_to(login_url)
        expect(flash[:notice]).to be_truthy
        expect(assigns(:user).reset_password_token).to be_nil
      end
    end

    context 'when password and password_confirmation are invalid' do
      let!(:user) { create :user, company: company, reset_password_token: token, reset_password_sent_at: Time.current }

      subject { post :update, params: { user: { password: 'gamegame', password_confirmation: 'gamegame1' }, token: token } }

      it do
        is_expected
        expect(subject).to render_template(:edit)
        expect(assigns(:user).errors.messages[:password_confirmation].first).to be_truthy
        expect { user.reload }.not_to change(user, :reset_password_token)
      end
    end
  end
end
