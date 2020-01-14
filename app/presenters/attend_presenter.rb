# frozen_string_literal: true

class AttendPresenter
  def initialize(user, params = {})
    @user        = user
    @params      = params
    @attendances = AttendanceQuery.new(user.attendances, @params)
  end

  def chart
    @attendances.relation.select(
      "(#{status_count_on_month('attend_ok',    'attending_status', @params)})",
      "(#{status_count_on_month('attend_late',  'attending_status', @params)})",
      "(#{status_count_on_month('leave_ok',     'leaving_status',   @params)})",
      "(#{status_count_on_month('leave_early',  'leaving_status',   @params)})",
      "(#{status_count_on_month('annual_leave', 'off_status',       @params)})",
      "(#{total_time_of_latency('minutes_attend_late', @params)})",
      "(#{total_time_of_latency('minutes_leave_early', @params)})",
      "(#{sum_working_hours_on_month(@params)})"
    ).limit(1)
  end

  def in_month
    @attendances.relation.in_period(@params[:date], @params[:date_type]).order(day: :asc)
  end

  def total_working_hours_on_month
    @user.company.total_working_hours_on_month(@params[:date])
  end

  def total_working_days_in_month
    @user.company.total_working_days_in_month(@params[:date])
  end

  def forget_punch_in
    ForgotPunchInDaysService.new(@user, @user.company, @params[:date]).execute
  end

  private

  def status_count_on_month(status_value, status_type, params)
    @attendances.relation.status_count_on_month(status_value, status_type, params).to_sql
  end

  def sum_working_hours_on_month(params)
    @attendances.relation.sum_working_hours_on_month(params).to_sql
  end

  def total_time_of_latency(type, params)
    @attendances.relation.sum_time_of_latency(type, params).to_sql
  end
end
