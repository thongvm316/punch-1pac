# frozen_string_literal: true

# == Schema Information
#
# Table name: requests
#
#  id            :integer          not null, primary key
#  attendance_id :integer          not null
#  user_id       :integer          not null
#  reason        :string(500)      not null
#  attended_at   :time
#  left_at       :time
#  status        :integer          default("pending"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_requests_on_attendance_id  (attendance_id)
#  index_requests_on_user_id        (user_id)
#

class Request < ApplicationRecord
  belongs_to :attendance
  belongs_to :user
  has_one :activity, as: :activitable, dependent: :destroy

  enum status: { pending: 0, approved: 1, rejected: 2 }

  validates :reason, presence: true, length: { maximum: 500 }
  validate :both_attended_at_left_at_cannot_be_blank
  validate :attended_at_cannot_be_greater_than_left_at

  scope :for_user, ->(user, pself = nil) {
    return user.requests if pself
    case user.role
    when 'member'
      user.requests
    when 'superadmin'
      where(user_id: user.company.users).includes(:user)
    when 'admin'
      where(user_id: UserGroup.with_group(user.groups)).includes(:user)
    end
  }

  scope :search_by, ->(params) {
    q = all
    q = where(user_id: UserGroup.with_group(params[:group_id])) if params[:group_id].present?
    q = where(status: params[:status]) if params[:status].present?
    q
  }

  private

  def attended_at_cannot_be_greater_than_left_at
    errors.add(:attended_at, :less_than, count: 'left at') if attended_at && left_at && attended_at > left_at
  end

  def both_attended_at_left_at_cannot_be_blank
    if attended_at.blank? && left_at.blank?
      errors.add(:attended_at, :blank)
      errors.add(:left_at, :blank)
    end
  end
end
