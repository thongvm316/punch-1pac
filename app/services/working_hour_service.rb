# frozen_string_literal: true

class WorkingHourService
  def initialize(company, attended_at, left_at, attendance)
    @company     = company
    @attended_at = attended_at.to_i
    @left_at     = Time.zone.local(2000, 1, 1, left_at.hour, left_at.min, left_at.sec).to_i
    @attendance  = attendance
  end

  def execute
    weekday = @attendance.day.strftime('%A')
    business_day = @company.business_days.find_by(weekday: weekday.downcase)

    return 0 if !business_day || !@left_at

    do_math(business_day)
  end

  def do_math(business_day)
    morning_started_at        = business_day.morning_started_at.to_i
    morning_ended_at          = business_day.morning_ended_at.to_i
    afternoon_started_at      = business_day.afternoon_started_at.to_i
    afternoon_ended_at        = business_day.afternoon_ended_at.to_i

    @before_morning_start_time = @attended_at < morning_started_at
    @after_morning_start_time  = @attended_at.between?(morning_started_at, morning_ended_at)
    @in_afternoon_break_time   = (morning_ended_at..afternoon_started_at)
    @in_morning_working_time   = (morning_started_at..morning_ended_at)
    @in_afternoon_working_time = (afternoon_started_at..afternoon_ended_at)
    @in_afternoon_leave_time   = (afternoon_started_at..9999999999)

    return 0 if (@left_at < morning_started_at) || (@attended_at > afternoon_ended_at)

    morning_start   = morning_start(morning_started_at)
    morning_end     = morning_end(morning_ended_at)
    afternoon_start = afternoon_start(afternoon_started_at)
    afternoon_end   = afternoon_end(afternoon_ended_at)

    (morning_end - morning_start) + (afternoon_end - afternoon_start)
  end

  private

  def morning_start(morning_started_at)
    if @before_morning_start_time
      morning_started_at
    elsif @after_morning_start_time
      @attended_at
    else
      0
    end
  end

  def morning_end(morning_ended_at)
    if @in_afternoon_break_time.include? @left_at
      morning_ended_at
    elsif @in_morning_working_time.include? @left_at
      @left_at
    elsif @before_morning_start_time || @after_morning_start_time
      morning_ended_at
    else
      0
    end
  end

  def afternoon_start(afternoon_started_at)
    if @in_afternoon_break_time.include? @attended_at
      afternoon_started_at
    elsif @in_afternoon_working_time.include? @attended_at
      @attended_at
    elsif @in_afternoon_leave_time.include? @left_at
      afternoon_started_at
    else
      0
    end
  end

  def afternoon_end(afternoon_ended_at)
    if @left_at > afternoon_ended_at
      afternoon_ended_at
    elsif @in_afternoon_working_time.include? @left_at
      @left_at
    else
      0
    end
  end
end
