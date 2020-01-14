# frozen_string_literal: true

class GroupCSV
  class << self
    def row_data(attendance)
      [
        attendance.email,
        attendance.name,
        attendance.attend_ok.to_i,
        attendance.attend_late.to_i,
        attendance.leave_ok.to_i,
        attendance.leave_early.to_i,
        attendance.annual_leave.to_i,
        "#{attendance.working_hours.to_i / 3600}h#{attendance.working_hours.to_i % 3600 / 60}m"
      ]
    end

    def report_csv(attendances, _params = {})
      attendances.each_with_object([]) { |attend, arr| arr << row_data(attend) }
    end

    def report_zip(users, zos, params)
      document = DocumentService.new('User', params)

      users.each do |user|
        zos.put_next_entry "#{user.name}_#{user.email}.csv"
        attendances = AttendanceQuery.new(user.attendances).relation.in_period(params).order(day: :asc)
        content     = document.export_csv(attendances)
        zos.print content
      end
    end
  end
end
