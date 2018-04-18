# frozen_string_literal: true

class AttendanceSerializer < ApplicationSerializer
  attributes :id, :day, :attended_at, :left_at, :attending_status, :leaving_status, :off_status, :working_hours
  belongs_to :user, serializer: UserSerializer

  def day
    object.day.iso8601
  end

  def attended_at
    object&.attended_at&.strftime('%H:%M')
  end

  def left_at
    object&.left_at&.strftime('%H:%M')
  end
end
