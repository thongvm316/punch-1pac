# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :avatar_url, :gender, :department_name, :role

  def department_name
    object.department&.name.to_s
  end
end
