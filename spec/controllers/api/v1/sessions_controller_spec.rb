# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, email: 'foo@gmail.com', password: 'password', password_confirmation: 'password', company: company }

  before do
    in_namespace(company)
    authenticate_user(user)
  end

  describe 'GET #index' do
    context 'when user.sessions are existed' do
      let!(:sessions) { create_list :session, 2, user: user }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(2) { response_session }) }
    end

    context 'when user.sessions are not existed' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as([]) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when session is not exists' do
      subject { delete :destroy, params: { id: 1 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when session is exists' do
      let(:session) { create :session, user: user }

      subject { delete :destroy, params: { id: session.id } }

      its(:code) { is_expected.to eq '200' }
      it 'does not persisted anymore and jwt token is revoked' do
        is_expected
        expect(Session.find_by(id: session.id)).to be_nil
        expect(JwtBlacklist.find_by(jti: session.jti)).not_to be_nil
      end
    end
  end
end
