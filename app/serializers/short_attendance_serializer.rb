# frozen_string_literal: true

class ShortAttendanceSerializer < ApplicationSerializer
  attributes :id, :day, :attended_at, :left_at, :attending_status, :leaving_status, :off_status

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
