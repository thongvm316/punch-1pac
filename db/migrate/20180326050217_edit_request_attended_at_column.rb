# frozen_string_literal: true

class EditRequestAttendedAtColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :requests, :attended_at, :time, null: true
    change_column :requests, :left_at, :time, null: true
  end
end
