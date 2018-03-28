# frozen_string_literal: true

class ChangeAnnouncementColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :announcements, :title, :string
    change_column :announcements, :content, :string, limit: 500
    add_column :announcements, :due_date, :date, null: false
  end
end
