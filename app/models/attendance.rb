# frozen_string_literal: true

# == Schema Information
#
# Table name: attendances
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  day              :date             not null
#  attended_at      :time
#  left_at          :time
#  attending_status :string
#  leaving_status   :string
#  off_status       :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  working_hours    :integer          default(0), not null
#
# Indexes
#
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

  def self.in_period(str_date, date_type = nil)
    date = str_date.present? ? Date.parse(str_date) : Date.current
    raise ArgumentError if date.blank?
    if date_type == 'year'
      where('extract(year from day) = ?', date.year)
    else
      where(day: date.beginning_of_month..date.end_of_month)
    end
  rescue TypeError, ArgumentError
    where(id: nil)
  end

  def self.status_count_on_month(status_value, status_type, date, date_type = nil)
    select("count(id) as #{status_value}")
      .in_period(date, date_type)
      .where("#{status_type}": status_value)
      .group(status_type)
  end

  def self.sum_working_hours_on_month(date, date_type = nil)
    select('sum(working_hours) as working_hours')
      .in_period(date, date_type)
  end

  def self.chart(str_date = nil)
    select(
      "(#{status_count_on_month('attend_ok', 'attending_status', str_date).to_sql})",
      "(#{status_count_on_month('attend_late', 'attending_status', str_date).to_sql})",
      "(#{status_count_on_month('leave_ok', 'leaving_status', str_date).to_sql})",
      "(#{status_count_on_month('leave_early', 'leaving_status', str_date).to_sql})",
      "(#{status_count_on_month('annual_leave', 'off_status', str_date).to_sql})",
      "(#{sum_working_hours_on_month(str_date).to_sql})"
    ).limit(1)
  end

  def self.search_by(params)
    q = all
    q = q.where(user_id: UserGroup.with_group(params[:group_id])) if params[:group_id].present?
    q = q.with_status(params[:status]) if params[:status].present?
    q = q.where(day: Date.parse(params[:from_date])..Date.parse(params[:to_date])) if params[:from_date].present? && params[:to_date].present?
    q = q.where(user_id: params[:user_id]) if params[:user_id].present?
    q
  rescue TypeError, ArgumentError
    none
  end
end
