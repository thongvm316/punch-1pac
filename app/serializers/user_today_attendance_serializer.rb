# frozen_string_literal: true

class UserTodayAttendanceSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :owner, :role, :language, :password_changed,
             :activated, :activated_at, :deactivated_at, :created_at, :left_at, :attended_at, :attendance_id

  belongs_to :company, serializer: CompanySerializer

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def left_at
    object.left_at ? Time.zone.at(object.left_at).strftime('%H:%M') : ''
  end

  def attended_at
    object.attended_at ? Time.zone.at(object.attended_at).strftime('%H:%M') : ''
  end
end
