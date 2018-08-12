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

  def forbidden
    render json: { message: 'Forbidden' }, status: :forbidden
  end

  def not_found
    respond_to do |f|
      f.json { render json: { message: 'Not Found' }, status: :not_found }
      f.any { render file: 'pages/page_404', status: :not_found, layout: 'page' }
    end
  end

  def unauthorized
    render json: { message: 'Unauthorized' }, status: :unauthorized
  end

  def internal_server_error
    respond_to do |f|
      f.html { render file: 'errors/500.html', status: :internal_server_error, layout: 'page' }
      f.json { render json: { message: 'Internal Server Error' }, status: :internal_server_error }
    end
  end

  def render_422(error_messages)
    render json: { message: 'Unprocessable Entity', errors: error_messages }, status: :unprocessable_entity
  end

  def app_blocked_by_ip!
    if current_company.app_blocked_by_ip
      return if current_company.allowed_ips.exists?(ip_address: request.remote_ip)
      respond_to do |f|
        f.html { render file: 'pages/page_403', status: :forbidden, layout: 'page' }
        f.json { render json: { message: I18n.t('auth.messages.ip_address_block') }, status: :forbidden }
      end
    end
  end

  def set_locale
    I18n.locale = current_user&.language || I18n.default_locale
  end
end
