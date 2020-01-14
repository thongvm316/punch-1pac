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

    def setting_report(str_date)
      advance = str_date + 1.month
      (str_date..advance)
    end
  end
end
