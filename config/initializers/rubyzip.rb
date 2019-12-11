# frozen_string_literal: true

Zip.setup do |config|
  config.on_exists_proc = true
  config.continue_on_exists_proc = true
  config.unicode_names = true
  config.default_compression = Zlib::BEST_COMPRESSION
end
