# frozen_string_literal: true

class CreateRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :requests do |t|
      t.bigint :attendance_id, null: false
      t.bigint :user_id, null: false
      t.text :reason, null: false, limit: 500
      t.time :attended_at
      t.time :left_at
      t.string :status, null: false, default: 'pending'

      t.timestamps null: false
    end

    add_index :requests, :attendance_id
    add_index :requests, :user_id
  end
end
