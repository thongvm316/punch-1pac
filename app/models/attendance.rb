# frozen_string_literal: true

# == Schema Information
#
# Table name: attendances
#
#  id                  :bigint(8)        not null, primary key
#  user_id             :bigint(8)        not null
#  day                 :date             not null
#  attended_at         :time
#  left_at             :time
#  attending_status    :string
#  leaving_status      :string
#  off_status          :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  working_hours       :integer          default(0), not null
#  minutes_attend_late :integer          default(0), not null
#  minutes_leave_early :integer          default(0), not null
#
# Indexes
#
#  index_attendances_on_day              (day)
#  index_attendances_on_user_id          (user_id)
#  index_attendances_on_user_id_and_day  (user_id,day) UNIQUE
#

class Attendance < ApplicationRecord
  BLOCK_TIME = 5.minutes
  ATTENDING_STATUSES = %w[attend_ok attend_late].freeze
  LEAVING_STATUSES = %w[leave_ok leave_early].freeze
  OFF_STATUSES = %w[annual_leave].freeze

  belongs_to :user
  has_one :activity, as: :activitable, dependent: :destroy

  validates :day, presence: true
  validates :attending_status, inclusion: { in: ATTENDING_STATUSES }, allow_nil: true
  validates :leaving_status, inclusion: { in: LEAVING_STATUSES }, allow_nil: true
  validates :off_status, inclusion: { in: OFF_STATUSES }, allow_nil: true

  scope :attended, -> { where.not(attended_at: nil) }
  scope :with_status, ->(status) {
    where(attending_status: status)
      .or(where(leaving_status: status))
      .or(where(off_status: status))
  }
  scope :for_user, ->(user, pself = nil) {
    return user.attendances if pself
    case user.role
    when 'member'
      user.attendances
    when 'superadmin'
      where(user_id: user.company.users).includes(:user)
    when 'admin'
      where(user_id: UserGroup.with_group(user.groups)).includes(:user)
    end
  }

  def self.in_period(params = {})
    date     = TimeInDay.range_date(params)
    from, to = date.first, date.last

    raise ArgumentError if from.blank?
    if params[:date_type] == 'year'
      where('extract(year from day) = ?', date.first.year)
    elsif params[:date_type] == 'range'
      where(day: (from..to))
    else
      where(day: (from..to))
    end
  rescue TypeError, ArgumentError
    where(id: nil)
  end

  def self.search_by(params)
    q = all
    q = q.where(user_id: UserGroup.with_group(params[:group_id]))                   if params[:group_id].present?
    q = q.with_status(params[:status])                                              if params[:status].present?
    q = q.where(day: Date.parse(params[:from_date])..Date.parse(params[:to_date]))  if params[:from_date].present? && params[:to_date].present?
    q = q.joins(:user).merge(User.by_name_or_email(params[:name_or_email]))         if params[:name_or_email].present?
    q = q.in_period(params)                                                         if params[:date].present?
    q
  rescue TypeError, ArgumentError
    none
  end

  def self.chart_in_month(params)
    select(
      "(#{status_count_on_month('attend_ok',    'attending_status', params).to_sql})",
      "(#{status_count_on_month('attend_late',  'attending_status', params).to_sql})",
      "(#{status_count_on_month('leave_ok',     'leaving_status',   params).to_sql})",
      "(#{status_count_on_month('leave_early',  'leaving_status',   params).to_sql})",
      "(#{status_count_on_month('annual_leave', 'off_status',       params).to_sql})",
      "(#{sum_time_of_latency('minutes_attend_late', params).to_sql})",
      "(#{sum_time_of_latency('minutes_leave_early', params).to_sql})",
      "(#{sum_working_hours_on_month(params).to_sql})"
    ).limit(1)
  end

  def self.report_attendances_users_in_month(group, params)
    group.users.select(
      :id, :name, :email, :avatar_data, :company_id, :created_at, :deactivated_at, :activated_at, :activated,
      "(#{status_count_on_month('attend_ok',    'attending_status', params).where('attendances.user_id = users.id').to_sql})",
      "(#{status_count_on_month('attend_late',  'attending_status', params).where('attendances.user_id = users.id').to_sql})",
      "(#{status_count_on_month('leave_ok',     'leaving_status',   params).where('attendances.user_id = users.id').to_sql})",
      "(#{status_count_on_month('leave_early',  'leaving_status',   params).where('attendances.user_id = users.id').to_sql})",
      "(#{status_count_on_month('annual_leave', 'off_status',       params).where('attendances.user_id = users.id').to_sql})",
      "(#{sum_time_of_latency('minutes_attend_late', params).where('attendances.user_id = users.id').to_sql})",
      "(#{sum_time_of_latency('minutes_leave_early', params).where('attendances.user_id = users.id').to_sql})",
      "(#{sum_working_hours_on_month(params).where('attendances.user_id = users.id').to_sql})"
    )
  end

  def self.status_count_on_month(status_value, status_type, params = {})
    q = all
    q = q.select("count(id) as #{status_value}")
    q = q.in_period(params)
    q = q.where("#{status_type}": status_value).group(status_type)
    q
  end

  def self.sum_working_hours_on_month(params = {})
    select('sum(working_hours) as working_hours').in_period(params)
  end

  def self.sum_time_of_latency(type, params = {})
    select("sum(#{type}) as #{type}").in_period(params)
  end

  def attended_time
    return '-' if attended_at.nil?
    attended_at.strftime('%H:%M')
  end

  def left_time
    return '-' if left_at.nil?
    left_at.strftime('%H:%M')
  end
end
