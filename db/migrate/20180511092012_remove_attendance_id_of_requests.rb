# frozen_string_literal: true

class RemoveAttendanceIdOfRequests < ActiveRecord::Migration[5.1]
  change_table :requests, bulk: true do
    add_column :requests, :attendance_day, :date

    Request.find_in_batches do |requests|
      requests.each do |request|
        attendance = request.attendance || Attendance.find_by(user_id: request.user_id, day: request.annual_leave_day)
        request.update(attendance_day: attendance.day)
      end
    end

    remove_column :requests, :attendance_id
    remove_column :requests, :annual_leave_day
  end
end
