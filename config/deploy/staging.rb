# frozen_string_literal: true

set :stage, :staging
server '13.230.252.221', user: 'rails', roles: %w[app web]

set :application, '1punch-stg.1pac.vn'
set :repo_url, 'git@github.com:1PACVietnam/1punch-api.git'

# Default branch is :master
set :branch, 'master'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/1punch-stg.1pac.vn/public_html'

# capistrano-rails
set :rails_env, :staging
set :migration_role, :web

# capistrano-rbenv
set :rbenv_type, :user
set :rbenv_ruby, '2.4.2'
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
set :puma_conf, -> { "#{shared_path}/config/puma/1punch-stg.1pac.vn.rb" }
set :puma_role, :web

# Global options
# --------------
set :ssh_options, forward_agent: true