# frozen_string_literal: true

class CreateUserPermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :user_permissions, &:timestamps
  end
end
