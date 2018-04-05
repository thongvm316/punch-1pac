class AddPasswordChangedToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :password_changed, :boolean, null: false, default: false
  end
end
