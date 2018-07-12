# frozen_string_literal: true

class ForgotPunchInDaysService
  def initialize(current_user, current_company, date = nil, date_type = nil)
    @current_user = current_user
    @now = Time.current
    @query_time = date.present? ? Time.zone.parse(date) : @now
    @current_company = current_company
    @date_type = date_type
  end

  def execute
    return [] if @query_time.blank?
    return [] if @query_time > @now

    @days = []

    (from_date..to_date).step(1.day) do |timestamp|
      current_day = Time.zone.at(timestamp).to_date
      next if invalid_forgot_punch_in_day?(current_day)
      @days << current_day.strftime('%Y-%m-%d')
    end

    @days - punch_in_days
  end

  private

  def invalid_forgot_punch_in_day?(current_day)
    return true if current_day < @current_user.created_at
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
    @holidays ||= @current_company.holidays.in_month(@query_time.strftime('%Y-%m-%d'))
  end

  def to_date
    if @date_type == 'year'
      @query_time.end_of_year.to_i
    else
      @query_time.month < @now.month ? @query_time.end_of_month.to_i : (@now - 1.day).to_i
    end
  end

  def from_date
    @date_type == 'year' ? @query_time.beginning_of_year.to_i : @query_time.beginning_of_month.to_i
  end

  def punch_in_days
    @current_user.attendances.where(day: @days).map { |a| a.day.strftime('%Y-%m-%d') }
  end
end
