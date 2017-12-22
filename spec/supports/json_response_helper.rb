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

  def response_pagination
    {
      current_page: Integer,
      next_page: nullable_response(Integer),
      prev_page: nullable_response(Integer),
      per_page: Integer,
      total_count: Integer
    }
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
      started_at: hour_min_response,
      ended_at: hour_min_response,
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

  def response_user(permissions_size = nil)
    if permissions_size
      {
        id: Integer,
        email: String,
        name: String,
        permissions: Array.new(permissions_size) { response_permission }
      }
    else
      {
        id: Integer,
        email: String,
        name: String
      }
    end
  end

  def response_holiday
    {
      id:         Integer,
      name:       String,
      started_at: String,
      ended_at:   String
    }
  end

  def response_request
    {
      id:          Integer,
      reason:      String,
      attended_at: hour_min_response,
      left_at:     hour_min_response,
      status:      String,
      updated_at:  time_iso8601_response,
      user:        response_user
    }
  end

  def response_attendance
    {
      id:               Integer,
      day:              date_response,
      attended_at:      nullable_response(hour_min_response),
      left_at:          nullable_response(hour_min_response),
      attending_status: nullable_response(String),
      leaving_status:   nullable_response(String),
      off_status:       nullable_response(String),
      user:             response_user
    }
  end

  def response_permission
    {
      id:          Integer,
      name:        String
    }
  end

  def response_group(permissions_size)
    {
      id:          Integer,
      name:        String,
      permissions: Array.new(permissions_size) { response_permission }
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

  def hour_min_response
    /\d{2}:\d{2}/
  end

  def date_response
    /\d{4}-\d{2}-\d{2}/
  end
end
