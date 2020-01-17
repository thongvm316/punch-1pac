# frozen_string_literal: true

class GroupCSV
  HEADER = I18n.t(['group.report.email', 'group.report.name', 'group.report.attend_ok', 'group.report.attend_late', 'group.report.leave_ok', 'group.report.leave_early', 'group.report.annual_leave', 'user.report.min_attend_late', 'user.report.min_leave_early', 'group.report.working_hours'])

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
        time(attendance.minutes_attend_late),
        time(attendance.minutes_leave_early),
        time(attendance.working_hours)
      ]
    end

    def report_csv(attendances, _params = {})
      attendances.each_with_object([]) { |attend, arr| arr << row_data(attend) }
    end

    def report_zip(users, zos, params)
      document = DocumentService.new('User', params)

      users.each do |user|
        zos.put_next_entry "#{user.name}_#{user.email}.csv"
        attendances = user.attendances.in_period(params).order(day: :asc)
        content     = document.export_csv(attendances)
        zos.print content
      end
    end

    def time(data)
      "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"
    end
  end
end
