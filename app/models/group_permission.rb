# frozen_string_literal: true

# == Schema Information
#
# Table name: group_permissions
#
#  id            :integer          not null, primary key
#  group_id      :integer          not null
#  permission_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class GroupPermission < ApplicationRecord
  belongs_to :group
  belongs_to :permission
end
