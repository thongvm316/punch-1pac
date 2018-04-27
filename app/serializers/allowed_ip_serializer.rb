# frozen_string_literal: true

class AllowedIpSerializer < ApplicationSerializer
  attributes :id, :ip_address, :created_at

  def ip_address
    object.ip_address.to_s
  end

  def created_at
    object.created_at.iso8601
  end
end
