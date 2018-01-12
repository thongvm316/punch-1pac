# frozen_string_literal: true

FactoryBot.define do
  factory :permission do
    name       { Faker::Lorem.word }
    action     { Faker::Lorem.word }
    controller { Faker::Lorem.word }
    role       { Faker::Number.between(0, 1) }
  end
end
