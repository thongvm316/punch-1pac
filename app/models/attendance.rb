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
  belongs_to :user
  has_many :requests, dependent: :destroy

  validates :day, presence: true
  validates :attending_status, inclusion: %w[attend_ok attend_late], allow_nil: true
  validates :leaving_status, inclusion: %w[leave_ok leave_early], allow_nil: true
  validates :off_status, inclusion: %w[holiday weekend annual_leave], allow_nil: true

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
      where(user_id: user.company.users).includes(user: :department)
    when 'admin'
      where(user_id: UserGroup.select(:user_id).where(group_id: user.groups)).includes(user: :department)
    end
  }
  scope :status_count_each_month, ->(status) {
    select("DATE_TRUNC('month', day) as month, COUNT(id) as status_count")
      .where('extract(year from day) = ?', Date.current.year)
      .with_status(status)
      .group(:month)
  }

  scope :calendar, ->(params) {
    query_date = Time.zone.parse(params)

    if query_date
      where(day: query_date.beginning_of_month..query_date.end_of_month)
    else
      none
    end
  }

  def self.search_by(params)
    q = all
    q = where(user_id: UserGroup.select(:user_id).where(group_id: params[:group_id])) if params[:group_id].present?
    q = q.with_status(params[:status]) if params[:status].present?
    q = q.between(Time.zone.parse(params[:from_date]), Time.zone.parse(params[:to_date])) if params[:from_date].present? && params[:to_date].present?
    q
  end
end
