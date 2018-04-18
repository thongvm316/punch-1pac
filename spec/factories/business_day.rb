# frozen_string_literal: true

FactoryBot.define do
  factory :business_day do
    association(:company, factory: :company, strategy: :build)
    morning_started_at { Time.current }
    morning_ended_at { Time.current }
    afternoon_started_at { Time.current }
    afternoon_ended_at { Time.current }
    weekday 'monday'
  end
end
