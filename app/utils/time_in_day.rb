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

    def range_date(params = {})
      return month_range(params) if params[:date]
      return date_range(params) if params[:from_date]
      invalid_range
    rescue ArgumentError
      invalid_range
    end

    def month_range(params)
      [Date.parse(params[:date]).beginning_of_month, Date.parse(params[:date]).end_of_month]
    end

    def date_range(params)
      [Date.parse(params[:from_date]), Date.parse(params[:to_date])]
    end

    def invalid_range
      [Date.current.beginning_of_month, Date.current.end_of_month]
    end
  end
end
