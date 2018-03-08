# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association(:company, factory: :company, strategy: :build)
    role 'member'
    name { Faker::Name.name }
    gender 'male'
    language 'en'
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    password_confirmation { password }
    user_permissions_attributes do
      permissions = create_list(:permission, 3).pluck(:id)
      permissions.map { |id| { permission_id: id } }
    end
  end
end
