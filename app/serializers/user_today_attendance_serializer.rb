# frozen_string_literal: true

class UserTodayAttendanceSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :avatar_url, :left_at, :attended_at, :attendance_id

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def left_at
    object.left_at&.localtime&.strftime('%H:%M')
  end

  def attended_at
    object.attended_at&.localtime&.strftime('%H:%M')
  end
end
