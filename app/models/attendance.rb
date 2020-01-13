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

  def attended_time
    return '-' if attended_at.nil?
    attended_at.strftime('%H:%M')
  end

  def left_time
    return '-' if left_at.nil?
    left_at.strftime('%H:%M')
  end
end
