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
#
# Indexes
#
#  index_attendances_on_user_id          (user_id)
#  index_attendances_on_user_id_and_day  (user_id,day) UNIQUE
#

class Attendance < ApplicationRecord
  ATTENDING_STATUSES = %w[attend_ok attend_late].freeze
  LEAVING_STATUSES = %w[leave_ok leave_early].freeze
  OFF_STATUSES = %w[annual_leave].freeze

  belongs_to :user
  has_many :requests, dependent: :destroy

  validates :day, presence: true
  validates :attending_status, inclusion: { in: ATTENDING_STATUSES }, allow_nil: true
  validates :leaving_status, inclusion: { in: LEAVING_STATUSES }, allow_nil: true
  validates :off_status, inclusion: { in: OFF_STATUSES }, allow_nil: true

  scope :attended, -> { where.not(attended_at: nil) }
  scope :between, ->(from_date, to_date) { where(day: from_date..to_date) }
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
  scope :status_count_each_month, ->(status) {
    select("DATE_TRUNC('month', day) as month, COUNT(id) as status_count")
      .where('extract(year from day) = ?', Date.current.year)
      .with_status(status)
      .group(:month)
  }

  def self.calendar(str_date)
    date = str_date.present? ? Date.parse(str_date) : Date.current
    raise ArgumentError if date.blank?
    where(day: date.beginning_of_month..date.end_of_month)
  rescue TypeError, ArgumentError
    none
  end

  def self.search_by(params)
    q = all
    q = where(user_id: UserGroup.with_group(params[:group_id])) if params[:group_id].present?
    q = q.with_status(params[:status]) if params[:status].present?
    q = q.between(Time.zone.parse(params[:from_date]), Time.zone.parse(params[:to_date])) if params[:from_date].present? && params[:to_date].present?
    q = q.where(user_id: params[:user_id]) if params[:user_id].present?
    q
  end
end
