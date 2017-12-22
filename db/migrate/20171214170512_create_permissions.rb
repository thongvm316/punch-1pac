# frozen_string_literal: true

class CreatePermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :permissions do |t|
      t.string  :name, null: false
      t.string  :action, null: false
      t.string  :controller, null: false
      t.integer :role, null: false
      t.timestamps
    end
  end
end
