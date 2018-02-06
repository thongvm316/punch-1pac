# frozen_string_literal: true

class GroupWithAdminSerializer < ApplicationSerializer
  attributes :id, :name, :user_count

  has_many :users, serializer: UserSerializer, key: :admins

  def users
    object.users.admin
  end

  def user_count
    object.users.count
  end
end
