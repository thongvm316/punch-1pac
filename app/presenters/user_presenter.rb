# frozen_string_literal: true

class UserPresenter
  def initialize(user, params = {})
    @user        = user
    @params      = params
    @attendances = AttendanceQuery.new(user.attendances, @params).relation
  end

  def attendances_in_month
    @attendances.in_period(@params).order(day: :asc)
  end

  def chart_in_month
    @attendances.select(
      "(#{@attendances.status_count_on_month('attend_ok',    'attending_status', @params).to_sql})",
      "(#{@attendances.status_count_on_month('attend_late',  'attending_status', @params).to_sql})",
      "(#{@attendances.status_count_on_month('leave_ok',     'leaving_status',   @params).to_sql})",
      "(#{@attendances.status_count_on_month('leave_early',  'leaving_status',   @params).to_sql})",
      "(#{@attendances.status_count_on_month('annual_leave', 'off_status',       @params).to_sql})",
      "(#{@attendances.sum_time_of_latency('minutes_attend_late', @params).to_sql})",
      "(#{@attendances.sum_time_of_latency('minutes_leave_early', @params).to_sql})",
      "(#{@attendances.sum_working_hours_on_month(@params).to_sql})"
    ).limit(1)
  end

  def self.report_attendances_users_in_month(group, params)
    @attendances = AttendanceQuery.new.relation
    group.users.select(
      :id, :name, :email, :avatar_data, :company_id, :created_at, :deactivated_at, :activated_at, :activated,
      "(#{@attendances.status_count_on_month('attend_ok',    'attending_status', params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('attend_late',  'attending_status', params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('leave_ok',     'leaving_status',   params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('leave_early',  'leaving_status',   params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('annual_leave', 'off_status',       params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.sum_time_of_latency('minutes_attend_late', params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.sum_time_of_latency('minutes_leave_early', params).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.sum_working_hours_on_month(params).where('attendances.user_id = users.id').to_sql})"
    )
  end
end
