# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JWTAuthenticable
  include AppErrors
  include Pundit

  rescue_from AppErrors::Error403, with: :forbidden
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from Pundit::NotAuthorizedError, with: :unauthorized

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

  def forbidden
    render json: { message: 'Forbidden' }, status: 403
  end

  def not_found
    render json: { message: 'Not Found' }, status: 404
  end

  def unauthorized
    render json: { message: 'Unauthorized' }, status: 401
  end

  def render_422(error_messages)
    render json: { message: 'Unprocessable Entity', errors: error_messages }, status: 422
  end
end
