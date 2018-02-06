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
  company = FactoryBot.create(:company)
  FactoryBot.create_list(:user, 3, company: company)
end

admin = FactoryBot.create(:admin, email: 'admin@example.com', password: 'password')

FactoryBot.create_list(:holiday, 3, admin: admin)
FactoryBot.create_list(:announcement, 11, admin: admin)
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
