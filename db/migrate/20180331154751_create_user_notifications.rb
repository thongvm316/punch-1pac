# frozen_string_literal: true

class CreateUserNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :user_notifications do |t|
      t.bigint :user_id, null: false
      t.bigint :activity_id, null: false
      t.boolean :read, null: false, default: false

      t.timestamps null: false
    end

    add_index :user_notifications, :user_id
    add_index :user_notifications, %w[user_id activity_id], unique: true
  end
end
