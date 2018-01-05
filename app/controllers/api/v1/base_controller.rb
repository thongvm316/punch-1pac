# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include Authenticable
  include Pundit

  rescue_from AppErrors::Error403, with: :forbidden
  rescue_from Pundit::NotAuthorizedError, with: :unauthorized

  before_action :set_timezone

  private

  def set_timezone
    Time.zone = current_company.timezone
  end
end
