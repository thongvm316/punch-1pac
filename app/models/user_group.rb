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

  scope :not_in_group, ->(group_id) { where.not(group_id: group_id) }
end
