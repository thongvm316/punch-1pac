# frozen_string_literal: true

class CreateGroupPermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :group_permissions do |t|
      t.bigint :group_id, null: false
      t.bigint :permission_id, null: false
      t.timestamps
    end
  end
end
