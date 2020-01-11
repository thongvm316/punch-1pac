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

      q = all
      q = q.where('extract(year from day) = ?', date.year)         if type == 'year'
      q = q.where(day: date.beginning_of_month..date.end_of_month) if type.nil?
      q
    rescue TypeError, ArgumentError
      none
    end

    def status_count_on_month(status_value, status_type, date, date_type = nil)
      q = all
      q = q.select("count(id) as #{status_value}")
      q = q.in_period(date, date_type)
      q = q.where("#{status_type}": status_value).group(status_type)
      q
    end

    def single_status_count_on_month(status_value, status_type, params)
      in_period(params[:date], params[:date_type]).where("#{status_type}": status_value).size
    end
  end
end
