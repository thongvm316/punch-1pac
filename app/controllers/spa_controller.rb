# frozen_string_literal: true

class SpaController < ApplicationController
  before_action :current_company
  helper_method :current_user, :signed_in?

  def index
    session[:test] = request.subdomain
  end
end
