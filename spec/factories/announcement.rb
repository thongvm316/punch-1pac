# frozen_string_literal: true

FactoryBot.define do
  factory :announcement do
    admin_id 1
    title { Faker::Lorem.sentence }
    content { Faker::Lorem.paragraph }
    target 'everyone'
    sent 1
    status 'normal'
  end
end
