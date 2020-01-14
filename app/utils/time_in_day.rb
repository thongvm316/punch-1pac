# frozen_string_literal: true

class TimeInDay
  class << self
    def started
      Time.zone.local(2000, 1, 1, 0, 0, 0)
    end

    def ended
      Time.zone.local(2000, 1, 1, 23, 59, 59)
    end

    def current
      Time.zone.local(2000, 1, 1, Time.current.hour, Time.current.min, Time.current.sec)
    end

    def range_date(params)
      from_date = Date.parse(params[:from_date])
      to_date   = Date.parse(params[:to_date])
      (from_date..to_date)
    rescue TypeError, ArgumentError
      date = Date.current
      date.beginning_of_month..date.end_of_month
    end
  end
end
