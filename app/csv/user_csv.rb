# frozen_string_literal: true

class UserCSV
  HEADER = I18n.t(['user.report.day', 'user.report.checkin', 'user.report.checkout', 'user.report.late', 'user.report.leave_early', 'user.report.min_attend_late', 'user.report.min_leave_early', 'user.report.working_hours'])

  class << self
    def row_data(attendance)
      [
        attendance.day,
        attendance.attended_time,
        attendance.left_time,
        attendance.attending_status == 'attend_late' ? '✓' : '-',
        attendance.leaving_status   == 'leave_early' ? '✓' : '-',
        time(attendance.minutes_attend_late),
        time(attendance.minutes_leave_early),
        time(attendance.working_hours)
      ]
    end

    def report_csv(attendances, params = {})
      date = TimeInDay.range_date(params)
      from = date.first
      to = date.second

      (from..to).to_a.each_with_object([]) do |day, arr|
        attendance = attendances.find_by(day: day)
        arr << (attendance ? row_data(attendance) : [day])
      end
    end

    def footer(data)
      attend_days   = data.where.not(attended_at: nil).size
      left_days     = data.where.not(left_at: nil).size
      working_hours = data.sum(:working_hours)
      attend_late   = data.sum(:minutes_attend_late)
      leave_early   = data.sum(:minutes_leave_early)
      times_late    = data.where(attending_status: 'attend_late').size
      times_early   = data.where(leaving_status: 'leave_early').size

      ['Total', attend_days, left_days, times_late, times_early, time(attend_late), time(leave_early), time(working_hours)]
    end

    def time(data)
      "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"
    end
  end
end
