# frozen_string_literal: true

class DeviceTokenSerializer < ApplicationSerializer
  belongs_to :user

  attributes :id, :device_token, :device_type
end
