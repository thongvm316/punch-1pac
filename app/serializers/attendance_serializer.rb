# frozen_string_literal: true

class AttendanceSerializer < ApplicationSerializer
  attributes :id, :day, :attended_at, :left_at, :attending_status, :leaving_status, :off_status, :attend_late, :leave_early, :working_hours
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

  def attend_late
    convert_to_time(object.minutes_attend_late)
  end

  def leave_early
    convert_to_time(object.minutes_leave_early)
  end

  def working_hours
    convert_to_time(object.working_hours)
  end

  def convert_to_time(time)
    {
      hours: time.to_i / 3600,
      mins: time.to_i % 3600 / 60
    }
  end
end
