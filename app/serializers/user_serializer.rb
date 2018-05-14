# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :owner, :role, :language, :password_changed,
             :forgot_punch_in_days_in_month, :activated, :activated_at, :deactivated_at, :created_at

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def forgot_punch_in_days_in_month
    ForgotPunchInDaysService.new(object).execute
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
