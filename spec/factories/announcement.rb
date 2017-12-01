# frozen_string_literal: true

FactoryBot.define do
  factory :announcement do
    association(:admin, factory: :admin, strategy: :build)
    title { Faker::Lorem.sentence }
    content { Faker::Lorem.paragraph }
    send_type 'all'
    send_status 'sending'
    status 'normal'
  end
end
