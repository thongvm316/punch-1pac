# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name
  has_many :users, serializer: UserSerializer

  def users
    object.users.includes(:department)
  end
end
