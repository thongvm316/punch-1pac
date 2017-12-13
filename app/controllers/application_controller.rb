# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JWTAuthenticable

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  before_action :set_locale

  def current_company
    current_user.company
  rescue ActiveRecord::RecorNotFound
    head(404)
  end

  private

  def set_locale
    Time.zone = current_company.timezone
  end

  def not_found
    render json: { message: 'Not Found' }, status: 404
  end

  def render_422(error_messages)
    render json: { message: 'Unprocessable Entity', errors: error_messages }, status: 422
  end
end
