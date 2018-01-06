# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  EXPIRED_TIME = 30.days
  ALGORITHM = 'HS256'

  def authenticate_user
    @current_user ||= current_company.users.find(jwt_decode['sub'])
  rescue ActiveRecord::RecordNotFound
    head(401)
  rescue JWT::InvalidJtiError
    render json: { message: 'Token is revoked' }, status: 401
  rescue JWT::ExpiredSignature
    render json: { message: 'Token is expired' }, status: 401
  rescue JWT::DecodeError
    render json: { message: 'Token is invalid' }, status: 401
  end

  def current_company
    @current_company ||= Company.find_by!(namespace: request.subdomain)
  end

  def current_user
    @current_user
  end

  def signed_in?
    @current_user = current_company.users.find_by(id: jwt_decode['sub'])
    @current_user.present?
  end

  def token
    session[:access_token] || request.headers['Authorization']&.split&.last
  end

  def jwt_encode(data = {})
    JWT.encode(payload(data), ENV['JWT_KEY'], ALGORITHM)
  end

  def payload(data)
    {
      exp: Time.current.to_i + EXPIRED_TIME.to_i,
      jti: SecureRandom.uuid
    }.merge(data)
  end

  def jwt_decode
    @payload ||= JWT.decode(token, ENV['JWT_KEY'], true, algorithm: ALGORITHM, verify_jti: ->(jti) { jwt_revoked?(jti) }).first
  end

  def revoke_jwt!(usession = nil)
    payload = usession || jwt_decode
    JwtBlacklist.create(jti: payload['jti'], exp: payload['exp'])
  end

  def jwt_revoked?(jti)
    !JwtBlacklist.exists?(jti: jti)
  end
end
