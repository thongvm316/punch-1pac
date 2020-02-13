# frozen_string_literal: true

class GroupCSV < BaseCSV
  private

  def build_csv_header
    I18n.t(['group.report.email',
            'group.report.name',
            'group.report.attend_ok',
            'group.report.attend_late',
            'group.report.leave_ok',
            'group.report.leave_early',
            'user.report.min_attend_late',
            'user.report.min_leave_early',
            'group.report.days_off',
            'group.report.working_hours'])
  end

  def build_csv_footer
    ['', '', '', '', '', '', '', '', '', '']
  end

  def build_datum(datum)
    days_off = ForgotPunchInDaysService.new(datum, datum.company, @params).execute.size
    [
      datum.email,
      datum.name,
      datum.attend_ok.to_i,
      datum.attend_late.to_i,
      datum.leave_ok.to_i,
      datum.leave_early.to_i,
      time(datum.minutes_attend_late),
      time(datum.minutes_leave_early),
      days_off,
      time(datum.working_hours)
    ]
  end

  def export_csv
    @data.each_with_object([]) { |attend, arr| arr << build_datum(attend) }
  end

  def export_zip(users, zos, params)
    users.each do |user|
      zos.put_next_entry "#{user.name}_#{user.email}.csv"
      attendances = user.attendances.in_period(params).order(day: :asc)
      leave_days  = ForgotPunchInDaysService.new(user, user.company, params).execute
      document    = UserCSV.new(attendances, params.merge(leave_days: leave_days))
      content     = document.to_csv
      zos.print content
    end
  end
end
