# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

require_relative 'seeds/permission'

company = FactoryBot.create(:company)
user = FactoryBot.create(:user, email: 'wofi.minh@1pac.vn', password: 'password', password_confirmation: 'password', company: company)
superadmin = FactoryBot.create(:user, email: 'example@1pac.vn', password: 'password', password_confirmation: 'password', company: company, role: 'superadmin')

5.times do
  FactoryBot.create_list(:user, 3, company: FactoryBot.create(:company))
end

admin = FactoryBot.create(:admin, email: 'admin@example.com', password: 'password')

FactoryBot.create_list(:national_holiday, 20, country: %w[vietnam japan][rand(2)], admin: admin)
FactoryBot.create_list(:holiday, 10, company: Company.first)
FactoryBot.create_list(:announcement, 11, admin: admin)
FactoryBot.create(:group, name: Group::DEFAULT_NAME, company: company)
FactoryBot.create_list(:group, 5, company: company)
FactoryBot.create(:user_group, user: user, group: Group.last)
FactoryBot.create(:user_group, user: superadmin, group: Group.first)
FactoryBot.create(:user_group, user: superadmin, group: Group.last)

prev_month = Time.current - 1.month
next_month = Time.current + 1.month
(prev_month.to_i..next_month.to_i).step(1.day) do |t|
  day = Time.zone.at(t)
  attendance = FactoryBot.create(:attendance, day: day, user: [user, superadmin][rand(2)])
  FactoryBot.create(:request, attendance: attendance, user: attendance.user, status: Request.statuses.keys[rand(3)])
end

10.times do
  user = FactoryBot.create(:user, company: company)
  FactoryBot.create(:user_group, user: user, group: Group.first)
end

(1..7).each do |month|
  next if (prev_month.month..next_month.month).cover?(month)
  (month % 3).times do |day|
    FactoryBot.create(:attendance, user: superadmin, attending_status: 'attend_ok', day: Date.new(Date.current.year, month, day + 1))
  end
end

(8..12).each do |month|
  next if (prev_month.month..next_month.month).cover?(month)
  (month % 3).times do |day|
    FactoryBot.create(:attendance, user: superadmin, attending_status: 'attend_late', day: Date.new(Date.current.year, month, day + 1))
  end
end
