# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StaticsController, type: :controller do
  describe 'GET #top' do
    subject { get :top }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:top) }
  end
end
