# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include Pundit

  rescue_from AppErrors::Error403, with: :forbidden
  rescue_from Pundit::NotAuthorizedError, with: :unauthorized

  before_action :current_company
  before_action :authenticate_user
  before_action :set_timezone

  private

  def set_timezone
    Time.zone = current_company.timezone
  end
end
