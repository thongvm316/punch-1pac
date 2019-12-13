# frozen_string_literal: true

module CreateCSV
  mattr_accessor(:header, :footer)

  HEADER_GROUP_REPORT = I18n.t(['group.report.email', 'group.report.name', 'group.report.attend_ok', 'group.report.attend_late',
                                'group.report.leave_ok', 'group.report.leave_early', 'group.report.annual_leave', 'group.report.working_hours'])
  HEADER_USER_REPORT  = I18n.t(['user.report.day', 'user.report.checkin', 'user.report.checkout', 'user.report.late',
                                'user.report.leave_early', 'user.report.working_hours'])

  CSV_TYPE = 'text/csv; charset=utf-8; header=present'
  ZIP_TYPE = 'text/zip; charset=utf-8; header=present'

  def self.export_csv(csv_header, csv_data, has_footer = false)
    CSV.generate(headers: true) do |csv|
      csv << const_get(csv_header)
      csv_data.each { |obj| csv << obj }
      csv << footer if has_footer
    end
  end

  def self.write_footer(data)
    self.footer = ['Total', '', '', '', '', "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"]
  end
end
