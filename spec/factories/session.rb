# frozen_string_literal: true

FactoryBot.define do
  factory :session do
    association(:user, factory: :user, strategy: :build)
    jti { Faker::Internet.password }
    exp { Time.current }
    ip_address { Faker::Internet.ip_v4_address }
    client 'chrome'
    device_name 'macbook'
    device_type 'laptop'
    os 'mac_osx'
    user_agent { Faker::Internet.user_agent }
  end
end
