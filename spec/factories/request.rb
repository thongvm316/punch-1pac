# frozen_string_literal: true

FactoryBot.define do
  factory :request do
    association(:user, factory: :user, strategy: :build)
    attendance_day { Time.current }
    reason { Faker::Lorem.paragraph }
    attended_at { Time.current }
    left_at { Time.current }
    status 'pending'
    admin_reason nil
    admin_id nil
    kind 'attendance'
  end
end
