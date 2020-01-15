# frozen_string_literal: true

class DocumentService
  CSV_TYPE = 'text/csv; charset=utf-8; header=present'
  ZIP_TYPE = 'text/zip; charset=utf-8; header=present'

  def initialize(model, params = {})
    @model  = "#{model}CSV".constantize
    @params = params
  end

  def export_csv(data)
    rows = @model.report_csv(data, @params)

    CSV.generate(headers: true) do |csv|
      csv << @model::HEADER
      rows.each { |row| csv << row }
      csv << @model.footer(data) if @model.name == 'UserCSV'
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
end
