# frozen_string_literal: true
# == Schema Information
#
# Table name: requests
#
#  id            :integer          not null, primary key
#  attendance_id :integer          not null
#  user_id       :integer          not null
#  reason        :string(500)      not null
#  attended_at   :time             not null
#  left_at       :time             not null
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

  enum status: { pending: 0, approved: 1, rejected: 2 }

  validates :reason, presence: true, length: { maximum: 500 }
  validates :attended_at, presence: true
  validates :left_at, presence: true

  scope :for_user, ->(user, pself = nil) {
    return user.requests if pself
    case user.role
    when 'member'
      user.requests
    when 'superadmin'
      where(user_id: user.company.users).includes(:user)
    when 'admin'
      where(user_id: UserGroup.select(:user_id).where(group_id: user.groups)).includes(:user)
    end
  }

  scope :search_by, ->(params) {
    q = all
    q = where(user_id: UserGroup.select(:user_id).where(group_id: params[:group_id])) if params[:group_id].present?
    q = where(status: params[:status]) if params[:status].present?
    q
  }
end
