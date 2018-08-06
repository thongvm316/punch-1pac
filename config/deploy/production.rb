# frozen_string_literal: true

rbenv_ruby = File.read('.ruby-version').strip

set :stage, :production
server '206.189.145.80', user: 'rails', roles: %w[app web]

set :application, 'punch.ooo'
set :repo_url, 'git@github.com:1PACVietnam/1punch.git'

# Default branch is :master
set :branch, 'master'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/punch.ooo/public_html'

# capistrano-rails
set :rails_env, :production
set :migration_role, :web

set :assets_prefix, 'static'
set :rails_assets_groups, :assets
# If you need to touch public/images, public/javascripts, and public/stylesheets on each deploy
set :normalize_asset_timestamps, ['public/static']
set :keep_assets, 3

# capistrano-rbenv
set :rbenv_type, :user
set :rbenv_ruby, rbenv_ruby
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w[rake gem bundle ruby rails puma pumactl sidekiq sidekiqctl]
set :rbenv_roles, :all # default value

# capistrano/bundler
set :bundle_binstubs, -> { shared_path.join('bin') }
set :bundle_path, -> { shared_path.join('bundle') }
set :bundle_without, %w[development test].join(' ')
set :bundle_jobs, 4
set :bundle_flags, '--deployment --quiet'

# capistrano/puma
set :puma_user, fetch(:user)
set :puma_conf, -> { "#{shared_path}/config/puma/punch.ooo.rb" }
set :puma_role, :web

# capistrano/sidekiq
set :sidekiq_config, 'config/sidekiq.yml'

# capistrano/yarn
set :yarn_flags, ''
set :yarn_target_path, -> { release_path.join('frontend') }

# Global options
# --------------
set :ssh_options, forward_agent: true
