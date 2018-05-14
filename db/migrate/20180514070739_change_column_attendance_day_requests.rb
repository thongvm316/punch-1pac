class ChangeColumnAttendanceDayRequests < ActiveRecord::Migration[5.1]
  def change
    change_column :requests, :attendance_day, :date, null: false
  end
end
