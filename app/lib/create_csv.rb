# frozen_string_literal: true

module CreateCSV
  def self.export_csv(csv_header, csv_data, csv_footer = nil)
    CSV.generate(headers: true) do |csv|
      csv << csv_header
      create_csv_data(csv, csv_data)
      csv << csv_footer unless csv_footer.nil?
    end
  end

  def self.create_csv_data(csv, data)
    data.is_a?(Array) ? data.each { |obj| csv << obj } : csv << data
  end
end
