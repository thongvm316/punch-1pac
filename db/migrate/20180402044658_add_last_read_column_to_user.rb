# frozen_string_literal: true

class AddLastReadColumnToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :last_read_noti_id, :bigint, null: false, default: 0
  end
end
