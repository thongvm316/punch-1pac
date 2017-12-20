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
#  status        :string           default("pending"), not null
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

  validates :reason, presence: true, length: { maximum: 500 }
  validates :status, inclusion: { in: %w[pending approved rejected] }

  scope :in_group, ->(user) { where(user_id: User.where(group_id: user.group_id)) }
end
