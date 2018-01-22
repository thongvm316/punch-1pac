# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  controller do
    before_action :authenticate_user!
    before_action :current_company
    helper_method :current_user, :current_company

    def index
      @webpack_assets = {}
    end
  end

  describe 'GET #index' do
    let(:company) { create :company }
    let(:login_user) { create :user, company: company }

    before do
      in_namespace(company)
      authenticate_user(login_user)
    end

    subject { get :index, params: { path: Faker::Lorem.word } }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:index) }
  end
end
