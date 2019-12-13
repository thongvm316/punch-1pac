# frozen_string_literal: true

module CreateCSV
  mattr_accessor(:header, :footer)

  def self.export_csv(csv_data, has_footer = false)
    CSV.generate(headers: true) do |csv|
      csv << header
      csv_data.each { |obj| csv << obj }
      csv << footer if has_footer
    end
  end

  def self.write_footer(data)
    self.footer = ['Total', '', '', '', '', "#{data.to_i / 3600}h#{data.to_i % 3600 / 60}m"]
  end
end
