# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :position, :role, :language, :created_at

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
