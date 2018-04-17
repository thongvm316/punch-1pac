# frozen_string_literal: true

class RequestSerializer < ApplicationSerializer
  attributes :id, :reason, :attendance_day, :attended_at, :left_at, :status, :updated_at, :admin_reason, :kind, :annual_leave_day
  belongs_to :user, serializer: UserSerializer
  belongs_to :admin, serializer: UserSerializer

  def attendance_day
    object.attendance&.day
  end

  def attended_at
    object&.attended_at&.strftime('%H:%M')
  end

  def left_at
    object&.left_at&.strftime('%H:%M')
  end

  def updated_at
    object.updated_at.iso8601
  end
end
