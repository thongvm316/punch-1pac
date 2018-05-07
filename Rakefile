# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

task stats: 'punch:stats'

namespace :punch do
  task :stats do
    require 'rails/code_statistics'
    ::STATS_DIRECTORIES << ['Serializers', 'app/serializers']
    ::STATS_DIRECTORIES << ['Workers', 'app/workers']
    ::STATS_DIRECTORIES << ['Services', 'app/services']
    ::STATS_DIRECTORIES << ['Forms', 'app/forms']
    ::STATS_DIRECTORIES << ['Policies', 'app/loyalties']
    ::STATS_DIRECTORIES << ['Uploaders', 'app/uploaders']
    ::STATS_DIRECTORIES << %w[Specs spec]
  end
end

namespace :db do
  task :seed_by_file do
    filename = Rails.root.join('db', 'seeds', ENV['FILE'])
    puts "Seeding #{filename}..."
    load(filename) if File.exist?(filename)
  end
end
