# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.

if Rails.env == 'production'
  require 'bootsnap'

  Bootsnap.setup(
    cache_dir:            'tmp/cache', # Path to your cache
    load_path_cache:      true,        # Should we optimize the LOAD_PATH with a cache?
    autoload_paths_cache: true,        # Should we optimize ActiveSupport autoloads with cache?
    disable_trace:        false,       # Sets `RubyVM::InstructionSequence.compile_option = { trace_instruction: false }`
    compile_cache_iseq:   true,        # Should compile Ruby code into ISeq cache?
    compile_cache_yaml:   false        # Skip YAML cache for now, cause we were seeing issues with it
  )
end
