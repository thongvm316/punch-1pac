# frozen_string_literal: true

class CreateUserGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :user_groups do |t|
      t.bigint :user_id, null: false
      t.bigint :group_id, null: false

      t.timestamps
    end
  end
end
