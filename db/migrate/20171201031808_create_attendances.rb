# frozen_string_literal: true

class CreateAttendances < ActiveRecord::Migration[5.1]
  def change
    create_table :attendances do |t|
      t.bigint :user_id, null: false
      t.date :day, null: false
      t.time :attended_at
      t.time :left_at
      t.text :status, array: true, null: false, default: ['absent']

      t.timestamps null: false
    end

    add_index :attendances, :user_id
    add_index :attendances, %i[user_id day], unique: true
  end
end
