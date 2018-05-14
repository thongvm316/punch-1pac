# frozen_string_literal: true

class ChangeColumnAttendanceDayRequests < ActiveRecord::Migration[5.1]
  def change
    Request.where(attendance_day: nil).update_all(attendance_day: Date.current)
    change_column :requests, :attendance_day, :date, null: false
  end
end
