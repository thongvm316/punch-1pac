# frozen_string_literal: true

class UserCSV < BaseCSV
  private

  def build_csv_header
    I18n.t(['user.report.day',
            'user.report.checkin',
            'user.report.checkout',
            'user.report.late',
            'user.report.leave_early',
            'user.report.min_attend_late',
            'user.report.min_leave_early',
            'user.report.days_off',
            'user.report.working_hours'])
  end

  def build_datum(datum)
    [
      datum.day,
      datum.attended_time,
      datum.left_time,
      datum.attending_status == 'attend_late' ? 'X' : '-',
      datum.leaving_status   == 'leave_early' ? 'X' : '-',
      time(datum.minutes_attend_late),
      time(datum.minutes_leave_early),
      '-',
      time(datum.working_hours)
    ]
  end

  def datum(day)
    attendance = @data.find_by(day: day)
    return build_datum(attendance) if attendance
    return [day, '-', '-', '-', '-', '-', '-', 'X', '-'] if @params[:leave_days].include?(day.to_s)
    [day]
  end

  def export_csv
    from, to = TimeInDay.range_date(@params)
    (from..to).each_with_object([]) { |day, arr| arr << datum(day) }
  end

  def build_csv_footer
    attend_days   = @data.where.not(attended_at: nil).size
    left_days     = @data.where.not(left_at: nil).size
    working_hours = @data.sum(:working_hours)
    attend_late   = @data.sum(:minutes_attend_late)
    leave_early   = @data.sum(:minutes_leave_early)
    times_late    = @data.where(attending_status: 'attend_late').size
    times_early   = @data.where(leaving_status: 'leave_early').size

    ['Total', attend_days, left_days, times_late, times_early, time(attend_late), time(leave_early), @params[:leave_days].size, time(working_hours)]
  end
end
