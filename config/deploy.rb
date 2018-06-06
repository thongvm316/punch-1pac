# frozen_string_literal: true

# config valid only for current version of Capistrano
lock '3.6.1'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :airbrussh.
set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, false

# Default value for :linked_files is []
append :linked_files, 'config/database.yml', 'config/secrets.yml', '.env.staging', 'public/static/500.png'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'bundle', 'public/uploads', 'config/puma', 'public/app'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 3
set :local_user, 'minh'
set :use_sudo, false

namespace :deploy do
  desc 'Upload yml file.'
  task :upload_yml do
    on roles(:app) do
      execute "mkdir -p #{shared_path}/config"
      execute "mkdir -p #{shared_path}/config/puma"
      upload!('config/database.yml', "#{shared_path}/config/database.yml")
      upload!('config/secrets.yml', "#{shared_path}/config/secrets.yml")
      upload!('public/static/500.png', "#{shared_path}/public/static/500.png")
      upload!('.env.staging', "#{shared_path}/.env.staging")
      upload!('config/puma/1punch-stg.1pac.vn.rb', "#{shared_path}/config/puma/1punch-stg.1pac.vn.rb")
    end
  end
  before 'deploy:check', 'deploy:upload_yml'

  desc 'Seed the database.'
  task :seed_db do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, 'db:seed'
        end
      end
    end
  end

  desc 'Seed data by specific file'
  task :seed_by_file do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, "db:seed_by_file FILE=#{ENV['FILE']}"
        end
      end
    end
  end

  desc 'Clear sidekiq queues'
  task :clear_sidekiq_queues do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, 'punch:clear_sidekiq_queues'
        end
      end
    end
  end

  desc 'Reset database'
  task :reset_db do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, 'db:drop db:create'
        end
      end
    end
  end

  namespace :yarn do
    desc 'Build frontend code'
    task :build do
      on roles(:app) do
        within fetch(:yarn_target_path) do
          with fetch(:yarn_env_variables, {}) do
            execute :yarn, 'run build'
          end
        end
      end
    end
  end
  after 'yarn:install', 'deploy:yarn:build'

  desc 'Generate test data'
  task :generate_test_data do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, 'punch:create_user_groups_namespace_1'
        end
      end
    end
  end

  desc 'pghero track query stats over time'
  task :track_query_stats do
    on roles(:app) do
      within current_path do
        with(rails_env: fetch(:stage)) do
          execute :bundle, :exec, :rake, 'pghero:capture_query_stats'
        end
      end
    end
  end
end
