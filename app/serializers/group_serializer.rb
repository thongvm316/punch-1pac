# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name, :user_count
  has_many :users, serializer: UserSerializer
  has_many :admins, serializer: UserSerializer, class_name: 'User', foreign_key: :user_id

  def users
    object.users.includes(:department)
  end

  def admins
    object.users.admin
  end

  def user_count
    object.users.count
  end
end
