# frozen_string_literal: true

class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.bigint :admin_id, null: false
      t.string :send_type, null: false, default: 'all'
      t.string :send_status, null: false, default: 'sending'
      t.string :status, null: false, default: 'normal'
      t.string :title, null: false
      t.text :content, null: false, limit: 2000

      t.timestamps null: false
    end

    add_index :announcements, :admin_id
  end
end
