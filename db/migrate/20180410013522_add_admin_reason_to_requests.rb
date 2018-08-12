# frozen_string_literal: true

class AddAdminReasonToRequests < ActiveRecord::Migration[5.1]
  change_table :requests, bulk: true do
    add_column :requests, :admin_reason, :string, limit: 500, null: false, default: ''
    add_column :requests, :admin_id, :bigint
  end
end
