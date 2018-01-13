# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :current_company
  helper_method :current_user, :current_company

  def index
    @webpack_assets = Oj.load_file(Rails.root.join('public', 'webpack-assets.json').to_s)
  end
end
