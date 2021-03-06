# frozen_string_literal: true

# == Schema Information
#
# Table name: user_groups
#
#  id         :bigint(8)        not null, primary key
#  user_id    :bigint(8)        not null
#  group_id   :bigint(8)        not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserGroup < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :group, touch: true

  scope :not_in_group, ->(group_id) { where.not(group_id: group_id).or(UserGroup.where(group_id: nil)) }

  validates :user_id, uniqueness: { scope: :group_id }
  validate :member_cannot_have_more_than_one_group

  scope :with_group, ->(group_ids) { select(:user_id).where(group_id: group_ids) }

  private

  def member_cannot_have_more_than_one_group
    errors.add(:group, :less_than_or_equal_to, count: 1) if user.member? && UserGroup.where(user_id: user.id).exists?
  end
end
