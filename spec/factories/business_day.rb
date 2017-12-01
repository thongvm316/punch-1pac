# frozen_string_literal: true

FactoryBot.define do
  factory :business_day do
    association(:company, factory: :company, strategy: :build)
    started_at { Time.current }
    ended_at { Time.current }
    weekday { Time.current }
  end
end
