# frozen_string_literal: true

# == Schema Information
#
# Table name: group_permissions
#
#  id            :bigint(8)        not null, primary key
#  group_id      :bigint(8)        not null
#  permission_id :bigint(8)        not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class GroupPermission < ApplicationRecord
  belongs_to :group
  belongs_to :permission
end
