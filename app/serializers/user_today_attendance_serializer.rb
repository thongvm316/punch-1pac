# frozen_string_literal: true

class UserTodayAttendanceSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :language, :created_at, :attendance

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end

  def attendance
    attendance = object.attendances.find_by(day: Time.current)
    attendance ? ActiveModelSerializers::SerializableResource.new(attendance, serializer: ShortAttendanceSerializer).as_json : {}
  end
end
