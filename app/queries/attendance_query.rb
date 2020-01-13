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
