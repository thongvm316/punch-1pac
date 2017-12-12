# frozen_string_literal: true

module JsonResponseHelper
  def response_token_expired
    { message: 'Token is expired' }
  end

  def response_token_revoked
    { message: 'Token is revoked' }
  end

  def response_token_invalid
    { message: 'Token is invalid' }
  end
end
