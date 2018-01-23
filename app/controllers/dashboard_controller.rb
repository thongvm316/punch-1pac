# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :current_company

  def index
    @initial_state = {
      user: current_user.as_json(only: %i[id email role owner name gender language]).merge(avatar_url: current_user.avatar_url),
      company: current_company.as_json(except: %i[created_at updated_at logo_data]).merge(logo_url: current_company.logo_url)
    }
    @webpack_assets = Oj.load_file(Rails.root.join('public', 'app', '_webpack-assets-nxu54TIPbpRWzks8.json').to_s)
  end
end
