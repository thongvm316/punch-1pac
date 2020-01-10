# frozen_string_literal: true

class TotalTimeOfLatency
  def initialize(company, attendance = nil)
    @business_day = company.business_days.find_by(weekday: Date.current.strftime('%A').downcase)
    @check_time   = TimeInDay.current.to_i
    @start_day    = TimeInDay.started.to_i
    @attendance   = attendance
  end

  def execute
    @business_day = convert_business_day_to_timestamp
    @check_time.between?(@start_day, @business_day[:morning_ended_at]) ? in_morning : in_afternoon
  end

  private

  def in_morning
    if @check_time.between?(@business_day[:morning_started_at], @business_day[:morning_ended_at])
      @attendance ? @business_day[:morning_ended_at] - @check_time : @check_time - @business_day[:morning_started_at]
    else
      0
    end
  end

  def in_afternoon
    if @check_time.between?(@business_day[:afternoon_started_at], @business_day[:afternoon_ended_at])
      @attendance ? @business_day[:afternoon_ended_at] - @check_time : @check_time - @business_day[:afternoon_started_at]
    else
      0
    end
  end

  def convert_business_day_to_timestamp
    %i[morning_started_at morning_ended_at afternoon_started_at afternoon_ended_at].each_with_object({}) do |k, o|
      time = @business_day.send(k)
      o[k] = Time.zone.local(2000, 1, 1, time.hour, time.min, time.sec).to_i
    end
  end
end
