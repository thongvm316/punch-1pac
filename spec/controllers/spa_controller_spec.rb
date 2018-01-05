# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SpaController, type: :controller do
  let(:company) { create :company }

  before { in_namespace(company) }

  describe 'GET #index' do
    subject { get :index }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:index) }
  end
end
