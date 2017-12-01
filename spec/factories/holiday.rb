# frozen_string_literal: true

FactoryBot.define do
  factory :holiday do
    admin_id 1
    country { Faker::Address.country }
    name { Faker::Name.name }
    started_at { Time.current }
    ended_at { Time.current }
  end
end
