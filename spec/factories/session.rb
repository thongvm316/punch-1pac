# frozen_string_literal: true

FactoryBot.define do
  factory :session do
    association(:user, factory: :user, strategy: :build)
    jti { Faker::Internet.password }
    exp { Time.current }
    client_ip { Faker::Internet.ip_v4_address }
    client_name 'chrome'
    client_os 'linux'
    client_ua 'user-agent'
  end
end
