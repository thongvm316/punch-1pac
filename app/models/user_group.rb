# frozen_string_literal: true

# == Schema Information
#
# Table name: user_groups
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserGroup < ApplicationRecord
  belongs_to :user
  belongs_to :group

  scope :not_in_group, ->(group_id) { where.not(group_id: group_id).or(UserGroup.where(group_id: nil)) }

  validates :user_id, uniqueness: { scope: :group_id }
  validate :member_cannot_have_more_than_one_group

  private

  def member_cannot_have_more_than_one_group
    errors.add(:group, :less_than_or_equal_to, count: 1) if user.member? && UserGroup.where(user_id: user.id).exists?
  end
end
