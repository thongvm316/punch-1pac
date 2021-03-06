# frozen_string_literal: true

module AuthenticateHelper
  def in_namespace(company)
    @request.host = "#{company.namespace}.example.com"
  end

  def authenticate_user(user)
    jti = SecureRandom.uuid
    exp = Time.current.to_i + 2.days.to_i
    token = JWT.encode({ sub: user.id, jti: jti, exp: exp }, ENV['JWT_KEY'], 'HS256')
    request.headers['Authorization'] = "Bearer #{token}"
    request.session[:access_token] = token
  end
end
