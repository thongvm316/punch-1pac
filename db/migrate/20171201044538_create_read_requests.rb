# frozen_string_literal: true

class CreateReadRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :read_requests do |t|
      t.bigint :request_id, null: false
      t.bigint :user_id, null: false

      t.timestamps null: false
    end

    add_index :read_requests, :request_id
    add_index :read_requests, :user_id
    add_index :read_requests, %i[request_id user_id], unique: true
  end
end
