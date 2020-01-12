# frozen_string_literal: true

class AttendanceQuery
  attr_reader(:relation, :params)

  def initialize(relation = Attendance.all, params = {})
    @relation = relation.extending(Scopes)
    @params   = params
  end

  module Scopes
    def in_period(str_date, type = nil)
      date = str_date.present? ? Date.parse(str_date) : Date.current
      raise ArgumentError if date.blank?

      if type == 'year'
        where('extract(year from day) = ?', date.year)
      else
        where(day: date.beginning_of_month..date.end_of_month)
      end
    rescue TypeError, ArgumentError
      where(id: nil)
    end

    def status_count_on_month(status_value, status_type, date, date_type = nil)
      q = all
      q = q.select("count(id) as #{status_value}")
      q = q.in_period(date, date_type)
      q = q.where("#{status_type}": status_value).group(status_type)
      q
    end

    def sum_working_hours_on_month(date, date_type = nil)
      select('sum(working_hours) as working_hours').in_period(date, date_type)
    end

    def single_status_count_on_month(status_value, status_type, date, date_type = nil)
      in_period(date, date_type).where("#{status_type}": status_value).size
    end

    def single_working_hours_on_month(date = nil, date_type = nil)
      in_period(date, date_type).sum(:working_hours)
    end
  end
end
