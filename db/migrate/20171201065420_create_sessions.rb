# frozen_string_literal: true

class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.bigint :user_id, null: false
      t.string :jti, null: false
      t.bigint :exp, null: false
      t.inet :ip_address, null: false
      t.string :client
      t.string :device_name
      t.string :device_type, null: false
      t.string :os, null: false
      t.string :user_agent, null: false, limit: 1000

      t.timestamps null: false
    end

    add_index :sessions, :user_id
    add_index :sessions, :jti, unique: true
  end
end
