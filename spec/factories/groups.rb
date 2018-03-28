# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    name { Faker::Lorem.word }
    association(:company, factory: :company, strategy: :build)
  end
end
