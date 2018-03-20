# frozen_string_literal: true

class UserWithPermissionSerializer < ApplicationSerializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :language, :created_at

  has_many :permissions

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
