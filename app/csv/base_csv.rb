# frozen_string_literal: true

class BaseCSV
  def initialize(data, params = {})
    @data = data
    @params = params
  end

  def to_csv(csv_options = {})
    options = {}.merge(csv_options)
    CSV.generate(options) do |csv|
      csv << build_csv_header
      export_csv.each { |datum| csv << datum }
      csv << build_csv_footer
    end
  end

  def to_zip
    compressed_zip { |zos| export_zip(@data, zos, @params) }
  end

  def options(filename, type)
    { type: "#{type}; charset=utf-8; header=present", filename: filename, disposition: 'attachment' }
  end

  def time(data)
    "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"
  end

  private

  def compressed_zip
    compressed_filestream = Zip::OutputStream.write_buffer { |zos| yield(zos) }
    compressed_filestream.rewind
    compressed_filestream.read
  end

  def build_csv_header
    raise NotImplementedError
  end

  def build_csv_footer
    raise NotImplementedError
  end
end
