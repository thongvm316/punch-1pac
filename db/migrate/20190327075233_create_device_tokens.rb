# frozen_string_literal: true

class CreateDeviceTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :device_tokens do |t|
      t.string :device_token, null: false
      t.string :device_type, null: false
      t.boolean :permission
      t.bigint :user_id

      t.timestamps
    end

    add_index :device_tokens, :user_id
    add_index :device_tokens, :device_token
  end
end
