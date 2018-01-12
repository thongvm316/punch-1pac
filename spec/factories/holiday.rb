# frozen_string_literal: true

FactoryBot.define do
  factory :holiday do
    association(:admin, factory: :admin, strategy: :build)
    country { Faker::Address.country }
    name { Faker::Name.name }
    started_at { Time.current }
    ended_at { Time.current }
  end
end
