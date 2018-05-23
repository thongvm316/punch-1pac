# frozen_string_literal: true

# == Schema Information
#
# Table name: sessions
#
#  id          :bigint(8)        not null, primary key
#  user_id     :bigint(8)        not null
#  jti         :string           not null
#  exp         :bigint(8)        not null
#  ip_address  :inet             not null
#  client      :string
#  device_name :string
#  device_type :string           not null
#  os          :string           not null
#  user_agent  :string(1000)     not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_sessions_on_jti      (jti) UNIQUE
#  index_sessions_on_user_id  (user_id)
#

class Session < ApplicationRecord
  belongs_to :user

  validates :jti, presence: true, uniqueness: true
  validates :exp, presence: true
  validates :ip_address, presence: true
  validates :device_type, presence: true
  validates :os, presence: true
  validates :user_agent, presence: true, length: { maximum: 1000 }

  def self.track!(user, payload, request)
    client = DeviceDetector.new(request.user_agent)
    session = find_by(client: client.name, device_type: client.device_type, ip_address: request.remote_ip, os: "#{client.os_name}_#{client.os_full_version}")
    data = {
      user_id: user.id,
      jti: payload[:jti],
      exp: payload[:exp],
      ip_address: request.remote_ip,
      client: client.name,
      device_name: client.device_name,
      device_type: client.device_type,
      os: "#{client.os_name}_#{client.os_full_version}",
      user_agent: request.user_agent
    }
    session ? session.update(data) : create(data)
  end
end
