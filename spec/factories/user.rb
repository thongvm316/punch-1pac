# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association(:company, factory: :company, strategy: :build)
    association(:department, factory: :department, strategy: :build)
    role 'member'
    name { Faker::Name.name }
    gender 'male'
    language 'en'
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    password_confirmation { password }
  end
end
