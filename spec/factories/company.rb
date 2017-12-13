# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    sequence(:namespace, 1) { |i| "namespace_#{i}" }
    name { Faker::Name.name }
    country { Faker::Address.country }
    industry 'startup'
    address { Faker::Address.street_address }
    phone_number { Faker::PhoneNumber.phone_number }
    postal_code { Faker::Address.postcode }
    tax_code { Faker::Internet.password }
    activated 1
    timezone 'Asia/Bangkok'
    breaktime 1.0
    breakdays { %w[sunday saturday] }
  end
end
