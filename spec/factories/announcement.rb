# frozen_string_literal: true

FactoryBot.define do
  factory :announcement do
    association(:admin, factory: :admin, strategy: :build)
    content { Faker::Lorem.paragraph }
    due_date { Date.current + 1.day }
    target 'everyone'
    sent 1
    status 'normal'
  end
end
