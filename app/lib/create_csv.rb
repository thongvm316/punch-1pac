# frozen_string_literal: true

module CreateCSV
  def self.export_csv(csv_header, csv_data, csv_footer = nil)
    CSV.generate(headers: true) do |csv|
      csv << csv_header
      csv << create_csv_data(csv, csv_data)
      csv << csv_footer
    end
  end

  def self.create_csv_data(csv, data)
    if data.is_a?(Array)
      data.each do |obj|
        csv << obj
      end
    else
      csv << data
    end
    csv
  end
end
