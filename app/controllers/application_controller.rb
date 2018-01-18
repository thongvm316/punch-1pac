# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authenticable
  include AppErrors

  # Only verify csrf token on request that contains session access_token
  # So requests are from mobile app will be ignored
  protect_from_forgery with: :exception, if: -> { session[:access_token].present? }

  rescue_from AppErrors::Error403, with: :forbidden
  rescue_from AppErrors::Error500, with: :internal_server_error
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def forbidden
    render json: { message: 'Forbidden' }, status: 403
  end

  def not_found
    respond_to do |f|
      f.html { render file: 'errors/404.html', status: 404, layout: 'static' }
      f.json { render json: { message: 'Not Found' }, status: 404 }
    end
  end

  def unauthorized
    render json: { message: 'Unauthorized' }, status: 401
  end

  def internal_server_error
    respond_to do |f|
      f.html { render file: 'errors/500.html', status: 500, layout: 'static' }
      f.json { render json: { message: 'Internal Server Error' }, status: 500 }
    end
  end

  def render_422(error_messages)
    render json: { message: 'Unprocessable Entity', errors: error_messages }, status: 422
  end
end
