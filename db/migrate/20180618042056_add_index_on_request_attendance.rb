# frozen_string_literal: true

class AddIndexOnRequestAttendance < ActiveRecord::Migration[5.1]
  def change
    add_index :attendances, :day
    add_index :requests, :attendance_day
  end
end
