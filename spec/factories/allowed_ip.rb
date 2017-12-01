# frozen_string_literal: true

FactoryBot.define do
  factory :allowed_ip do
    association(:company, factory: :company, strategy: :build)
    ip_address { Faker::Internet.ip_v4_address }
  end
end
