# frozen_string_literal: true

class DeviceTokenSerializer < ApplicationSerializer
  attributes :id, :device_token, :device_type, :user_id
end
