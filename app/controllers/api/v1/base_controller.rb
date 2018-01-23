# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include Banken

  rescue_from Banken::NotAuthorizedError, with: :unauthorized

  before_action :current_company
  before_action :authenticate_user!
  before_action :set_timezone

  private

  def set_timezone
    Time.zone = current_company.timezone
  end
end
