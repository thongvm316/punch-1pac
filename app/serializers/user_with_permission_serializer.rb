# frozen_string_literal: true

class UserWithPermissionSerializer < ApplicationSerializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :created_at

  has_many :permissions

  def created_at
    object.created_at.iso8601
  end
end
