# frozen_string_literal: true

class DropTableReadRequests < ActiveRecord::Migration[5.1]
  def change
    drop_table :read_requests, if_exists: true
  end
end
