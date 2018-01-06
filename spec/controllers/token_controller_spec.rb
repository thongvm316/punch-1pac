# frozen_string_literal: true

# fronzen_string_literal: true

require 'rails_helper'

RSpec.describe TokenController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }

  before { in_namespace(company) }

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
      shared_examples 'a successful login' do
        before { request.headers['User-Agent'] = Faker::Internet.user_agent(:chrome) }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(access_token: String) }
        it 'track user session after login success' do
          expect { subject }.to change(Session, :count).by(1)
        end
      end

      context 'when request from mobile' do
        subject { post :create, params: { email: user.email, password: user.password } }

        it_behaves_like 'a successful login'
      end

      context 'when request from xhr' do
        subject { post :create, params: { email: user.email, password: user.password }, xhr: true }

        it_behaves_like 'a successful login'

        it 'should contain access_token in session' do
          is_expected
          expect(session[:access_token]).not_to be_nil
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when request from mobile' do
      subject { delete :destroy }

      before { authenticate_user(user) }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when request from xhr' do
      subject { delete :destroy, xhr: true }

      before { authenticate_user(user) }

      its(:code) { is_expected.to eq '200' }
      it 'should delete access_token in session' do
        is_expected
        expect(session[:access_token]).to be_nil
      end
    end
  end
end
