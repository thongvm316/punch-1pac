# frozen_string_literal: true

class CreateGroupPermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :group_permissions, &:timestamps
  end
end
