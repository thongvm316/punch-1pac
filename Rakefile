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
  end

  task :clear_sidekiq_queues do
    require 'sidekiq/api'
    # 1. Clear retry set
    Sidekiq::RetrySet.new.clear
    # 2. Clear scheduled jobs
    Sidekiq::ScheduledSet.new.clear
    # 3. Clear 'Processed' and 'Failed' jobs statistics (OPTIONAL)
    Sidekiq::Stats.new.reset
  end

  task :create_user_groups_namespace_1 do
    Rails.initialize! unless Rails.env.development?
    user_groups = []
    User.where.not(id: UserGroup.select(:user_id).all).where(company_id: 1).find_each do |user|
      user_groups << UserGroup.new(user_id: user.id, group_id: 1)
    end
    UserGroup.import(user_groups)
  end

  task :seed_test_company do
    Rails.initialize! unless Rails.env.development?
    company = FactoryBot.create(:company, namespace: 'test')
    user = FactoryBot.create(:user, email: 'test@example.com', password: 'password', password_confirmation: 'password', company: company, created_at: Time.current.beginning_of_year)
    group = FactoryBot.create(:group, name: 'default', company: company)
    user_group = FactoryBot.create(:user_group, user: user, group: group)
    prev_month = Time.current - 1.month
    next_month = Time.current + 1.month
    (prev_month.to_i..next_month.to_i).step(1.day) do |t|
      day = Time.zone.at(t)
      attendance = FactoryBot.create(:attendance, day: day, user: user)
    end
  end
end
