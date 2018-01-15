namespace :db do
  namespace :seed do
    desc "Seed permission based on the seeds/permission_seed.rb"
    task permissions: :environment do
      filename = Rails.root.join('db', 'seeds', 'permission_seed.rb')
      load(filename) if File.exist?(filename)
    end
  end
end
