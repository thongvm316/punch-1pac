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

  def response_401
    { message: 'Unauthorized' }
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
      total_pages: Integer
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
      breakdays: Array,
      logo_url: String
    }
  end

  def response_announcement
    {
      id: Integer,
      content: String,
      due_date: date_response,
      target: String,
      status: String,
      readed: boolean_response,
      created_at: time_iso8601_response
    }
  end

  def response_user
    {
      id: Integer,
      email: String,
      name: String,
      avatar_url: String,
      gender: String,
      position: nullable_response(String),
      role: String,
      language: String,
      created_at: date_response
    }
  end

  def response_user_with_permissions(size)
    response_user.merge(permissions: Array.new(size) { response_permission })
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
      day:         date_response,
      attended_at: hour_min_response,
      left_at:     hour_min_response,
      status:      String,
      updated_at:  time_iso8601_response,
      user:        response_user
    }
  end

  def response_attendance_chart
    {
      attend_ok: nullable_response(Integer),
      attend_late: nullable_response(Integer),
      leave_ok: nullable_response(Integer),
      leave_early: nullable_response(Integer),
      annual_leave: nullable_response(Integer)
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

  def response_group(users = 0)
    {
      id:          Integer,
      name:        String,
      users:       Array.new(users) { response_user }
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
