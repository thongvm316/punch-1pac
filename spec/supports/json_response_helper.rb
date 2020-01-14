# frozen_string_literal: true

module JsonResponseHelper
  def response_401
    { message: 'Unauthorized' }
  end

  def response_403
    { message: 'Forbidden' }
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
      ip_address: String,
      created_at: time_iso8601_response
    }
  end

  def response_business_day
    {
      id: Integer,
      morning_started_at: hour_min_response,
      morning_ended_at: hour_min_response,
      afternoon_started_at: hour_min_response,
      afternoon_ended_at: hour_min_response,
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
      logo_url: String,
      breakdays: nullable_response(Array),
      punch_method: String
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
      owner: boolean_response,
      role: String,
      language: String,
      password_changed: boolean_response,
      activated: boolean_response,
      activated_at: date_response,
      deactivated_at: nullable_response(date_response),
      created_at: date_response
    }
  end

  def response_user_with_attendance
    {
      id: Integer,
      email: String,
      name: String,
      avatar_url: String,
      gender: String,
      position: nullable_response(String),
      owner: boolean_response,
      role: String,
      language: String,
      password_changed: boolean_response,
      activated: boolean_response,
      activated_at: date_response,
      deactivated_at: nullable_response(date_response),
      created_at: date_response,
      left_at: nullable_response(hour_min_response),
      attended_at: nullable_response(hour_min_response),
      attendance_id: nullable_response(Integer)
    }
  end

  def response_user_with_groups(size = 0)
    {
      id: Integer,
      email: String,
      name: String,
      avatar_url: String,
      gender: String,
      position: nullable_response(String),
      owner: boolean_response,
      role: String,
      language: String,
      forgot_punch_in_days_in_month: Array,
      password_changed: boolean_response,
      activated: boolean_response,
      activated_at: date_response,
      deactivated_at: nullable_response(date_response),
      created_at: date_response,
      groups: Array.new(size) { response_group }
    }
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
      id:               Integer,
      reason:           String,
      attendance_day:   nullable_response(date_response),
      attended_at:      hour_min_response,
      left_at:          hour_min_response,
      status:           String,
      updated_at:       time_iso8601_response,
      user:             response_user,
      admin_reason:     nullable_response(String),
      admin:            nullable_response(response_user),
      kind:             String
    }
  end

  def response_device_token
    {
      id:               Integer,
      device_token:     String,
      device_type:      String,
      user_id:          Integer
    }
  end

  def response_attendance_chart
    {
      statuses: {
        attend_ok: Integer,
        attend_late: Integer,
        leave_ok: Integer,
        leave_early: Integer,
        leave: Integer,
        minutes_leave_early: {
          hours: Integer,
          mins: Integer
        },
        minutes_attend_late: {
          hours: Integer,
          mins: Integer
        },
        working_hours: {
          hours: Integer,
          mins: Integer
        }
      },
      meta: {
        company_total_working_hours_on_month: Integer,
        company_total_working_days_in_month: Integer
      }
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
      attend_late:      { hours: Integer, mins: Integer },
      leave_early:      { hours: Integer, mins: Integer },
      working_hours:    { hours: Integer, mins: Integer },
      user:             response_user
    }
  end

  def response_pending_request
    {
      id:                  Integer,
      name:                String,
      num_pending_request: Integer
    }
  end

  def response_permission
    {
      id:          Integer,
      name:        String
    }
  end

  def response_group(_users = 0)
    {
      id:          Integer,
      name:        String,
      image_url:   String,
      description: String,
      users_count: Integer
    }
  end

  def response_activity
    {
      id: Integer,
      user: response_user,
      activitable_id: Integer,
      activitable_type: String,
      kind: String,
      created_at: time_iso8601_response
    }
  end

  def response_notification
    {
      id: Integer,
      user: response_user,
      activitable: Hash,
      activitable_id: Integer,
      activitable_type: String,
      kind: String,
      created_at: time_iso8601_response
    }
  end

  def response_group_report
    {
      id: Integer,
      name: String,
      email: String,
      avatar_url: String,
      attend_ok: Integer,
      attend_late: Integer,
      leave_ok: Integer,
      leave_early: Integer,
      leave: Integer,
      minutes_attend_late: {
        hours: Integer,
        mins: Integer
      },
      minutes_leave_early: {
        hours: Integer,
        mins: Integer
      },
      working_hours: {
        hours: Integer,
        mins: Integer
      }
    }
  end

  def response_user_report
    {
      attend_ok: Integer,
      attend_late: Integer,
      leave_ok: Integer,
      leave_early: Integer,
      leave: Integer,
      minutes_leave_early: {
        hours: Integer,
        mins: Integer
      },
      minutes_attend_late: {
        hours: Integer,
        mins: Integer
      },
      working_hours: {
        hours: Integer,
        mins: Integer
      }
    }
  end

  def response_meta
    {
      company_total_working_hours_on_month: Integer,
      company_total_working_days_in_month: Integer,
      company_monthly_report: Integer
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
