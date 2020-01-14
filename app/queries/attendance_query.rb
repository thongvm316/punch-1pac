# frozen_string_literal: true

class AttendanceQuery
  attr_reader(:relation, :params)

  def initialize(relation = Attendance.all, params = {})
    @relation = relation.extending(Scopes)
    @params   = params
  end

  def search_by
    q = @relation
    q = q.where(user_id: UserGroup.with_group(@params[:group_id]))                   if @params[:group_id].present?
    q = q.with_status(@params[:status])                                              if @params[:status].present?
    q = q.where(day: Date.parse(@params[:from_date])..Date.parse(@params[:to_date])) if @params[:from_date].present? && @params[:to_date].present?
    q = q.joins(:user).merge(User.by_name_or_email(@params[:name_or_email]))         if @params[:name_or_email].present?
    q = q.in_period(@params[:date])                                                  if params[:date].present?
    q = q.page(params[:page]).per(params[:per_page]).order(day: :desc)
    q
  rescue TypeError, ArgumentError
    none
  end

  module Scopes
    def in_period(str_date, type = nil)
      date = str_date.present? ? Date.parse(str_date) : Date.current
      raise ArgumentError if date.blank?

      if type == 'year'
        where('extract(year from day) = ?', date.year)
      elsif type == 'range'
        where(day: TimeInDay.range_date(str_date))
      else
        where(day: date.beginning_of_month..date.end_of_month)
      end
    rescue TypeError, ArgumentError
      where(id: nil)
    end

    ### for relations
    def status_count_on_month(status_value, status_type, params = {})
      q = all
      q = q.select("count(id) as #{status_value}")
      q = q.in_period(params[:date], params[:date_type])
      q = q.where("#{status_type}": status_value).group(status_type)
      q
    end

    def sum_working_hours_on_month(params = {})
      select('sum(working_hours) as working_hours').in_period(params[:date], params[:date_type])
    end

    def sum_time_of_latency(type, params = {})
      select("sum(#{type}) as #{type}").in_period(params[:date], params[:date_type])
    end

    ### for personal
    def single_status_count_on_month(status_value, status_type, params = {})
      in_period(params[:date], params[:date_type]).where("#{status_type}": status_value).size
    end

    def single_working_hours_on_month(params = {})
      in_period(params[:date], params[:date_type]).sum(:working_hours)
    end

    def single_time_of_latency(type, params = {})
      in_period(params[:date], params[:date_type]).sum(type.to_sym)
    end
  end
end
