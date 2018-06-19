# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name, :image_url, :description
  has_many :users, serializer: UserTodayAttendanceSerializer

  def users
    object.users.unscope(where: :activated).with_today_attendance
  end

  def image_url
    ActionController::Base.helpers.asset_url(object.image_url)
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
