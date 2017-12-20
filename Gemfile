# frozen_string_literal: true

source 'https://rubygems.org'

ruby '~> 2.4.2'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Core
gem 'rails', '~> 5.1.4'
gem 'puma', '~> 3.7'

# Postgres
gem 'pg', '~> 0.18'
gem 'pghero'
gem 'pg_query', '>= 0.9.0'

# Background job
gem 'sidekiq'
gem 'sidekiq-scheduler'
gem 'redis-namespace'

# Authentication and Authorization
gem 'bcrypt'
gem 'jwt'
gem 'pundit'

# Application dependencies
gem 'active_model_serializers', '~> 0.10.0'
gem 'activerecord-import'
gem 'bootsnap', require: false
gem 'device_detector'
gem 'kaminari'
gem 'oj'
gem 'rack-cors'
gem 'shrine'

group :development, :test do
  gem 'bullet'

  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-coolline'
  gem 'awesome_print'

  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'

  gem 'annotate'

  gem 'letter_opener'

  gem 'rubocop', require: false
  gem 'rails_best_practices', require: false
  gem 'brakeman', require: false

  gem 'capistrano', '~> 3.6.0'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rbenv', '~> 2.0'
  gem 'capistrano-bundler', '~> 1.2'
  gem 'capistrano3-puma'
  gem 'capistrano-sidekiq'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', require: false
  gem 'rails-controller-testing'
  gem 'rspec-its'
  gem 'rspec-request_describer'
  gem 'rspec-json_matcher'
  gem 'database_rewinder'
  gem 'shoulda-matchers'
  gem 'timecop'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
