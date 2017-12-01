# frozen_string_literal: true

class CreateReadAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :read_announcements do |t|
      t.bigint :announcement_id, null: false
      t.bigint :user_id, null: false

      t.timestamps null: false

      t.timestamps
    end

    add_index :read_announcements, :announcement_id
    add_index :read_announcements, :user_id
    add_index :read_announcements, %i[announcement_id user_id], unique: true
  end
end
