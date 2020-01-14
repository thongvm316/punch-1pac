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

    def range_date(str_date)
      if str_date.is_a?(Array)
        from_date = Date.parse(str_date.first)
        to_date   = Date.parse(str_date.second)
        (from_date..to_date)
      else
        (Date.current.beginning_of_month..Date.current.end_of_the_month)
      end
    end
  end
end
