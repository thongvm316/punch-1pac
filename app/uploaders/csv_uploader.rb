# frozen_string_literal: true

class CsvUploader < Shrine
  plugin :determine_mime_type
  plugin :delete_raw
end
