# frozen_string_literal: true

# == Schema Information
#
# Table name: device_tokens
#
#  id           :bigint(8)        not null, primary key
#  device_token :string           not null
#  device_type  :string           not null
#  permission   :boolean
#  user_id      :bigint(8)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_device_tokens_on_device_token  (device_token)
#  index_device_tokens_on_user_id       (user_id)
#

class DeviceToken < ApplicationRecord
  belongs_to :user

  validates :device_token, presence: true
  validates :device_type, presence: true
end
