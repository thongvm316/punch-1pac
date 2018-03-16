# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :created_at

  def created_at
    object.created_at.iso8601
  end
end
