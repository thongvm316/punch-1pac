# frozen_string_literal: true

class UserCSV
  class << self
    def row_data(attendance)
      [
        attendance.day,
        attendance.attended_time,
        attendance.left_time,
        attendance.attending_status == 'attend_late' ? '✓' : '-',
        attendance.leaving_status   == 'leave_early' ? '✓' : '-',
        "#{attendance.minutes_attend_late.to_i / 3600}h#{attendance.minutes_attend_late.to_i % 3600 / 60}m",
        "#{attendance.minutes_leave_early.to_i / 3600}h#{attendance.minutes_leave_early.to_i % 3600 / 60}m",
        "#{attendance.working_hours.to_i / 3600}h#{attendance.working_hours.to_i % 3600 / 60}m"
      ]
    end

    def report_csv(attendances, params = {})
      date = Date.parse(params[:date])
      a = Date.parse('10 Jan 2020')
      b = Date.parse('20 Jan 2020')
      (a..b).to_a.each_with_object([]) do |day, arr|
        attendance = attendances.find_by(day: day)
        arr << (attendance ? row_data(attendance) : [day])
      end
    end
  end
end
