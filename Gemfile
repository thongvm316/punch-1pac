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
gem 'pg', '~> 0.18'

gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# Background job
gem 'sidekiq'
gem 'sidekiq-scheduler'
gem 'redis-namespace'

# Authentication and Authorization
gem 'bcrypt'
gem 'jwt'
gem 'banken'

# ActiveAdmin dependencies
gem 'activeadmin'
gem 'devise'

# Application dependencies
gem 'active_model_serializers', '~> 0.10.0'
gem 'activerecord-import'
gem 'bootsnap', require: false
gem 'device_detector'
gem 'dotenv-rails'
gem 'factory_bot_rails'
gem 'faker'
gem 'kaminari'
gem 'oj'
gem 'rack-cors'
gem 'roo'
gem 'shrine'
gem 'virtus'

group :staging, :production do
  gem 'logglier'
  gem 'bugsnag'
  gem 'lograge'
end

group :development, :test do
  gem 'bullet'

  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-coolline'
  gem 'awesome_print'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'annotate'
  gem 'letter_opener'

  gem 'strong_migrations'

  gem 'rubocop', require: false
  gem 'rails_best_practices', require: false
  gem 'brakeman', require: false

  gem 'capistrano', '~> 3.6.0'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rbenv', '~> 2.0'
  gem 'capistrano-bundler', '~> 1.2'
  gem 'capistrano3-puma'
  gem 'capistrano-sidekiq'
  gem 'capistrano-yarn'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'sitemap_generator'
end

group :test do
  gem 'simplecov', require: false
  gem 'rails-controller-testing'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'rspec-its'
  gem 'rspec-json_matcher'
  gem 'database_rewinder'
  gem 'shoulda-matchers'
  gem 'timecop'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
