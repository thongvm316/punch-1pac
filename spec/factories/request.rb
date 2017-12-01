# frozen_string_literal: true

FactoryBot.define do
  factory :request do
    association(:attendance, factory: :attendance, strategy: :build)
    association(:user, factory: :user, strategy: :build)
    reason { Faker::Lorem.paragraph }
    attended_at { Time.current }
    left_at { Time.current }
    status 'pending'
  end
end
