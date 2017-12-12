# frozen_string_literal: true

module JWTAuthenticable
  extend ActiveSupport::Concern

  EXPIRED_TIME = 30.days
  ALGORITHM = 'HS256'

  included do
    before_action :authenticate_user
  end

  def authenticate_user
    @current_user ||= User.find(jwt_decode['sub'])
  rescue ActiveRecord::RecordNotFound
    head(401)
  rescue JWT::InvalidJtiError
    render json: { message: 'Token is revoked' }, status: 401
  rescue JWT::ExpiredSignature
    render json: { message: 'Token is expired' }, status: 401
  rescue JWT::DecodeError
    render json: { message: 'Token is invalid' }, status: 401
  end

  def current_user
    @current_user
  end

  def token
    request.headers['Authorization']&.split&.last
  end

  def jwt_encode(data = {})
    JWT.encode(payload(data), ENV.fetch('JWT_KEY') { 'jwt_secret_key' }, ALGORITHM)
  end

  def payload(data)
    {
      exp: Time.current.to_i + EXPIRED_TIME.to_i,
      jti: SecureRandom.uuid
    }.merge(data)
  end

  def jwt_decode
    @payload ||= JWT.decode(token, ENV.fetch('JWT_KEY') { 'jwt_secret_key' }, true, algorithm: ALGORITHM,
                                                                                    verify_jti: ->(jti) { jwt_revoked?(jti) }).first
  end

  def revoke_jwt!
    payload = jwt_decode
    JwtBlacklist.create(jti: payload['jti'], exp: payload['exp'])
  end

  def jwt_revoked?(jti)
    !JwtBlacklist.exists?(jti: jti)
  end
end
