# frozen_string_literal: true

class UserWithPermissionSerializer < ApplicationSerializer
  attributes :id, :email, :name, :avatar_url
  has_many :permissions
end
