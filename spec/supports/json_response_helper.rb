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

  def response_404
    { message: 'Not Found' }
  end

  def response_422(errors)
    { message: 'Unprocessable Entity', errors: errors }
  end

  def response_department
    {
      id: Integer,
      name: String
    }
  end

  def response_allowed_ip
    {
      id: Integer,
      ip_address: String
    }
  end

  def response_business_day
    {
      id: Integer,
      started_at: /\d{2}:\d{2}/,
      ended_at: /\d{2}:\d{2}/,
      weekday: String
    }
  end

  def response_session
    {
      id: Integer,
      jti: String,
      exp: Integer,
      ip_address: String,
      client: nullable_response(String),
      device_name: nullable_response(String),
      device_type: String,
      os: String,
      user_agent: String,
      updated_at: time_iso8601_response
    }
  end

  def response_company
    {
      id: Integer,
      namespace: String,
      name: String,
      country: String,
      industry: String,
      address: String,
      phone_number: String,
      postal_code: nullable_response(String),
      tax_code: nullable_response(String),
      activated: boolean_response,
      timezone: String,
      breaktime: Float,
      breakdays: Array
    }
  end

  def response_announcement
    {
      id: Integer,
      title: String,
      content: String,
      target: String,
      status: String,
      created_at: time_iso8601_response
    }
  end

  def response_user
    {
      id: Integer,
      email: String,
      name: String
    }
  end

  private

  def nullable_response(expected_response)
    ->(actual) do
      return true if actual.is_a? NilClass
      return actual.match?(expected_response) if actual.is_a? Regexp
      return actual.is_a?(expected_response) if actual.is_a? Class
      be_json_as(expected_response)
    end
  end

  def boolean_response
    ->(actual) { [TrueClass, FalseClass].include?(actual.class) }
  end

  def time_iso8601_response
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[-\+]{1}\d{2}:\d{2}$/
  end
end
