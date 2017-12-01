# frozen_string_literal: true

FactoryBot.define do
  factory :department do
    association(:company, factory: :company, strategy: :build)
    name { Faker::Lorem.word }
  end
end
