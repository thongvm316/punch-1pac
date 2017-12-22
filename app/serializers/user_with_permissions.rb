# frozen_string_literal: true

class UserWithPermissionSerializer < ActiveModel::Serializer
  attributes :id, :email, :name
  has_many :permissions
end
