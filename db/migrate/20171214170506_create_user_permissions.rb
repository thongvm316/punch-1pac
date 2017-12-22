# frozen_string_literal: true

class CreateUserPermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :user_permissions do |t|
      t.bigint :user_id, null: false
      t.bigint :permission_id, null: false
      t.timestamps
    end
  end
end
