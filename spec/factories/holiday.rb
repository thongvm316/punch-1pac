# frozen_string_literal: true

FactoryBot.define do
  factory :holiday do
    association(:company, factory: :company, strategy: :build)
    started_at { Faker::Date.backward(14) }
    ended_at { Faker::Date.forward(14) }
    name { Faker::Lorem.word }
  end
end
