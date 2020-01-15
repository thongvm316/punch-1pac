# frozen_string_literal: true

class UserPresenter
  def initialize(user = nil, params = {})
    @user   = user
    @params = params
  end

  def single_personal_attendances
    AttendPresenter.new(@user, @params).in_month
  end

  def single_report_attendances
    attendances = AttendanceQuery.new(@user.attendances).relation
    {
      attend_ok:        attendances.single_status_count_on_month('attend_ok',    'attending_status', @params),
      attend_late:      attendances.single_status_count_on_month('attend_late',  'attending_status', @params),
      leave_ok:         attendances.single_status_count_on_month('leave_ok',     'leaving_status',   @params),
      leave_early:      attendances.single_status_count_on_month('leave_early',  'leaving_status',   @params),
      leave:            attendances.single_status_count_on_month('annual_leave', 'off_status',       @params),
      mins_attend_late: attendances.single_time_of_latency('minutes_attend_late', @params),
      mins_leave_early: attendances.single_time_of_latency('minutes_leave_early', @params),
      working_hours:    attendances.single_working_hours_on_month(@params)
    }
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
