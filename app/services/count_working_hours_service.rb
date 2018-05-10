# frozen_string_literal: true

class CountWorkingHoursService
  def initialize(company, attended_at, left_at, attendance)
    @attended_at  = attended_at.to_i
    @left_at      = left_at ? Time.zone.local(2000, 1, 1, left_at.hour, left_at.min, left_at.sec).to_i : nil
    @business_day = company.business_days.find_by(weekday: attendance.day.strftime('%A').downcase)
  end

  def execute
    return 0 if !@business_day || !@left_at

    @ts_business_day = convert_business_day_to_timestamp

    return 0 if (@left_at < @ts_business_day[:morning_started_at]) || (@attended_at > @ts_business_day[:afternoon_ended_at])

    (morning_end_at - morning_start_at) + (afternoon_end_at - afternoon_start_at)
  end

  private

  def convert_business_day_to_timestamp
    %i[morning_started_at morning_ended_at afternoon_started_at afternoon_ended_at].each_with_object({}) { |k, o| o[k] = @business_day.send(k).to_i }
  end

  def morning_start_at
    if @attended_at < @ts_business_day[:morning_started_at]
      @ts_business_day[:morning_started_at]
    elsif @attended_at.between?(@ts_business_day[:morning_started_at], @ts_business_day[:morning_ended_at])
      @attended_at
    else
      0
    end
  end

  def morning_end_at
    if @left_at.between?(@ts_business_day[:morning_ended_at], @ts_business_day[:afternoon_started_at])
      @ts_business_day[:morning_ended_at]
    elsif @left_at.between?(@ts_business_day[:morning_started_at], @ts_business_day[:morning_ended_at])
      @left_at
    elsif @attended_at < @ts_business_day[:morning_started_at] || @attended_at.between?(@ts_business_day[:morning_started_at], @ts_business_day[:morning_ended_at])
      @ts_business_day[:morning_ended_at]
    else
      0
    end
  end

  def afternoon_start_at
    if @attended_at.between?(@ts_business_day[:morning_ended_at], @ts_business_day[:afternoon_started_at])
      @ts_business_day[:afternoon_started_at]
    elsif @attended_at.between?(@ts_business_day[:afternoon_started_at], @ts_business_day[:afternoon_ended_at])
      @attended_at
    elsif @left_at >= @ts_business_day[:afternoon_started_at]
      @ts_business_day[:afternoon_started_at]
    else
      0
    end
  end

  def afternoon_end_at
    if @left_at > @ts_business_day[:afternoon_ended_at]
      @ts_business_day[:afternoon_ended_at]
    elsif @left_at.between?(@ts_business_day[:afternoon_started_at], @ts_business_day[:afternoon_ended_at])
      @left_at
    else
      0
    end
  end
end
