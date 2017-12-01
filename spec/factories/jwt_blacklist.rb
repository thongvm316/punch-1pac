# frozen_string_literal: true

FactoryBot.define do
  factory :jwt_blacklist do
    jti { Faker::Internet.password }
    exp { Time.current }
  end
end
