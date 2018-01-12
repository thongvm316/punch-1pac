# frozen_string_literal: true

class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.bigint :admin_id, null: false
      t.integer :target, null: false, default: 0
      t.boolean :sent, null: false, default: false
      t.integer :status, null: false, default: 0
      t.string :title, null: false
      t.string :content, null: false, limit: 2000

      t.timestamps null: false
    end

    add_index :announcements, :admin_id
  end
end
