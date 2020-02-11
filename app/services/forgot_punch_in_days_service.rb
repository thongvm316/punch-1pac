# frozen_string_literal: true

class ForgotPunchInDaysService
  def initialize(current_user, current_company, params = {})
    @current_user        = current_user
    @now                 = Time.current
    @from_date, @to_date = TimeInDay.range_date(params)
    @to_date             = Date.yesterday if @to_date > @now
    @current_company     = current_company
  end

  def execute
    @days = (@from_date..@to_date).each_with_object([]) do |day, arr|
      next if invalid_forgot_punch_in_day?(day)
      arr << day.to_s
    end

    @days - punch_in_days
  end

  private

  def invalid_forgot_punch_in_day?(current_day)
    return true if current_day < @current_user.activated_at.to_date
    return true if in_holiday?(current_day)
    return true if in_breakday?(current_day)
    return true if in_deactivated_time?(current_day)
    false
  end

  def in_deactivated_time?(current_day)
    return true if @current_user.deactivated_at && current_day.between?(@current_user.deactivated_at.to_date, @current_user.activated_at.to_date - 1.day)
    return true if @current_user.deactivated? && current_day >= @current_user.deactivated_at.to_date
    false
  end

  def in_holiday?(current_day)
    holidays.find { |holiday| current_day.between?(holiday.started_at, holiday.ended_at) }
  end

  def in_breakday?(current_day)
    breakdays.include?(current_day.strftime('%A').downcase)
  end

  def breakdays
    @breakdays ||= @current_company.breakdays
  end

  def holidays
    @holidays ||= @current_company.holidays.range_date(@from_date, @to_date)
  end

  def punch_in_days
    @current_user.attendances.where(day: @days).map { |a| a.day.strftime('%Y-%m-%d') }
  end
end
