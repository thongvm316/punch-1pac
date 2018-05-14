# frozen_string_literal: true
# == Schema Information
#
# Table name: requests
#
#  id             :integer          not null, primary key
#  user_id        :integer          not null
#  reason         :string(500)      not null
#  attended_at    :time
#  left_at        :time
#  status         :integer          default("pending"), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  admin_reason   :string
#  admin_id       :integer
#  kind           :integer          default("attendance"), not null
#  attendance_day :date
#
# Indexes
#
#  index_requests_on_user_id  (user_id)
#

class Request < ApplicationRecord
  belongs_to :attendance, optional: true
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  belongs_to :admin, class_name: 'User', foreign_key: 'admin_id', optional: true
  has_one :activity, as: :activitable, dependent: :destroy

  enum status: { pending: 0, approved: 1, rejected: 2 }
  enum kind: { attendance: 0, annual_leave: 1 }

  validates :attendance_day, presence: true
  validates :admin, presence: true, if: -> { !pending? }
  validates :admin_reason, length: { maximum: 500 }, if: -> { rejected? }
  validates :reason, presence: true, length: { maximum: 500 }
  validate :both_attended_at_left_at_cannot_be_blank, if: -> { attendance? }
  validate :attended_at_cannot_be_greater_than_left_at, if: -> { attendance? }

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
    q = where(kind: params[:kind]) if params[:kind].present?
    q
  }

  private

  def attended_at_cannot_be_greater_than_left_at
    errors.add(:attended_at, :less_than, count: 'left at') if attended_at && left_at && attended_at > left_at
  end

  def both_attended_at_left_at_cannot_be_blank
    # rubocop:disable Style/GuardClause
    if attended_at.blank? && left_at.blank?
      errors.add(:attended_at, :blank)
      errors.add(:left_at, :blank)
    end
    # rubocop:enable Style/GuardClause
  end
end
