# frozen_string_literal: true

class DocumentService
  HEADER_GROUP = I18n.t(['group.report.email', 'group.report.name', 'group.report.attend_ok', 'group.report.attend_late', 'group.report.leave_ok', 'group.report.leave_early', 'group.report.annual_leave', 'group.report.working_hours'])
  HEADER_USER  = I18n.t(['user.report.day', 'user.report.checkin', 'user.report.checkout', 'user.report.late', 'user.report.leave_early', 'user.report.working_hours'])
  CSV_TYPE     = 'text/csv; charset=utf-8; header=present'
  ZIP_TYPE     = 'text/zip; charset=utf-8; header=present'

  def initialize(model, params = {})
    @model  = "#{model}Query".constantize
    @params = params
  end

  def export_csv(data)
    rows = @model.report_csv(data, @params)

    CSV.generate(headers: true) do |csv|
      csv << DocumentService.const_get(header)
      rows.each { |row| csv << row }
      csv << footer(data) if @model.name == 'UserQuery'
    end
  end

  def export_zip(data)
    compressed_zip { |zos| @model.report_zip(data, zos, @params) }
  end

  def option(filename, type)
    { type: DocumentService.const_get(type), filename: filename, disposition: 'attachment' }
  end

  private

  def compressed_zip
    compressed_filestream = Zip::OutputStream.write_buffer { |zos| yield(zos) }
    compressed_filestream.rewind
    compressed_filestream.read
  end

  def header
    @model.name == 'UserQuery' ? 'HEADER_USER' : 'HEADER_GROUP'
  end

  def footer(attend)
    data = attend.single_sum_working_hours_on_month(@params)
    ['Total', '', '', '', '', "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"]
  end
end
