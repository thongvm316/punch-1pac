# frozen_string_literal: true

# == Schema Information
#
# Table name: user_permissions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  permission_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class UserPermission < ApplicationRecord
  belongs_to :user
  belongs_to :permission
end
