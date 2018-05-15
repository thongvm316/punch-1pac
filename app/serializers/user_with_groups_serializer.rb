# frozen_string_literal: true

class UserWithGroupsSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :owner, :role, :language, :password_changed,
             :forgot_punch_in_days_in_month, :activated, :activated_at, :deactivated_at, :created_at

  has_many :groups

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def activated_at
    object.activated_at&.strftime('%Y-%m-%d')
  end

  def deactivated_at
    object.deactivated_at&.strftime('%Y-%m-%d')
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
