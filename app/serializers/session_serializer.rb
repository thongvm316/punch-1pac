# frozen_string_literal: true

class SessionSerializer < ApplicationSerializer
  attributes :id, :jti, :exp, :ip_address, :client, :device_name, :device_type, :os, :user_agent, :updated_at

  def ip_address
    object.ip_address.to_s
  end

  def updated_at
    object.updated_at.iso8601
  end
end
