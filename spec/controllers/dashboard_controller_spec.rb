# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    subject { get :index, params: { path: Faker::Lorem.word } }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:index) }
  end
end
