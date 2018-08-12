# frozen_string_literal: true

class ChangeRequestsColumns < ActiveRecord::Migration[5.1]
  change_table :requests, bulk: true do
    add_column :requests, :annual_leave_day, :date
    add_column :requests, :kind, :integer, null: false, default: 0
    change_column :requests, :attendance_id, :bigint, null: true
    change_column :requests, :admin_reason, :string, null: true, default: nil
  end
end
