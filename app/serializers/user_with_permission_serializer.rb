# frozen_string_literal: true

class UserWithPermissionSerializer < ApplicationSerializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :language, :password_changed, :created_at

  has_many :permissions

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
