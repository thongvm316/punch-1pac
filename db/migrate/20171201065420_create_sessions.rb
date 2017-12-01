# frozen_string_literal: true

class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.bigint :user_id, null: false
      t.string :jti, null: false
      t.datetime :exp, null: false
      t.inet :client_ip, null: false
      t.string :client_name, null: false
      t.string :client_os, null: false
      t.text :client_ua, null: false, limit: 5000

      t.timestamps null: false
    end

    add_index :sessions, :user_id
    add_index :sessions, :jti, unique: true
  end
end
