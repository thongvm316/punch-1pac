# frozen_string_literal: true

class AddDeactivatedColumnToUsers < ActiveRecord::Migration[5.1]
  change_table :users, bulk: true do
    add_column :users, :activated, :boolean, null: false, default: true
    add_column :users, :activated_at, :datetime
    add_column :users, :deactivated_at, :datetime

    User.find_in_batches do |users|
      users.each { |user| user.update(activated_at: user.created_at) }
    end
  end
end
