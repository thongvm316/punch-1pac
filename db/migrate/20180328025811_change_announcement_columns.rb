class ChangeAnnouncementColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :announcements, :title
    change_column :announcements, :content, :string, limit: 500
    add_column :announcements, :due_date, :date, null: false
  end
end
