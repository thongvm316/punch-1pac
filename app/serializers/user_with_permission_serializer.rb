# frozen_string_literal: true

class UserWithPermissionSerializer < ApplicationSerializer
  attributes :id, :email, :name, :avatar_url, :gender, :department_name

  has_many :permissions

  def department_name
    object.department&.name
  end
end
