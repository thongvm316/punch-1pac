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
      date      = Date.current
      from_date = date.beginning_of_month
      to_date   = date.end_of_month
      return [from_date, to_date] if params.nil?

      if params[:date]
        from_date = Date.parse(params[:date]).beginning_of_month
        to_date   = Date.parse(params[:date]).end_of_month
      elsif params[:from_date]
        from_date = Date.parse(params[:from_date])
        to_date   = Date.parse(params[:to_date])
      end

      [from_date, to_date]
    end
  end
end
