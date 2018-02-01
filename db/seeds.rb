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
FactoryBot.create(:user, email: 'wofi.minh@1pac.vn', password: 'password', password_confirmation: 'password', company: company)

5.times do
  company = FactoryBot.create(:company)
  FactoryBot.create_list(:user, 3, company: company)
end

admin = FactoryBot.create(:admin, email: 'admin@example.com', password: 'password')

FactoryBot.create_list(:holiday, 3, admin: admin)
FactoryBot.create_list(:announcement, 11, admin: admin)
