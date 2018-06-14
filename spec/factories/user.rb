# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association(:company, factory: :company, strategy: :build)
    role 'member'
    name 'John Kenedy'
    gender 'male'
    position 'Backend Developer'
    language 'en'
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    password_confirmation { password }

    trait :with_groups do
      after(:create) do |user|
        user.groups = [create(:group, company: user.company)]
      end
    end

    trait :with_attendance do
      after(:create) do |user|
        user.attendances << create(:attendance)
      end
    end
  end
end
