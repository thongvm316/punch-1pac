# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
# require "action_cable/engine"
require 'sprockets/railtie'
# require "rails/test_unit/railtie"
require 'csv'
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Punch
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    config.time_zone = 'UTC'
    config.active_record.default_timezone = :utc
    config.active_record.time_zone_aware_types = %i[datetime time]

    config.i18n.default_locale = :en
    config.i18n.available_locales = %i[en vi ja]
    # ref https://github.com/globalize/globalize#i18n-fallbacks-for-empty-translations
    config.i18n.fallbacks = true

    config.autoload_paths += Dir[Rails.root.join('lib')]

    config.generators do |g|
      g.assets false
      g.helper false
      g.template_engine nil
      g.test_framework :rspec
      g.fixture_replacement :factory_bot, dir: 'spec/factories'
    end

    config.active_job.queue_adapter = :sidekiq

    config.assets.paths << Rails.root.join('app', 'assets', 'files')
    config.assets.paths << Rails.root.join('frontend', 'node_modules')
    config.assets.enabled = true
    config.assets.gzip = false
    config.assets.css_compressor = :sass
    config.assets.js_compressor = :uglifier
    config.assets.prefix = '/static'
  end
end
