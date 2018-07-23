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
    punch_method 'normal'
    trait :with_default_group do
      after(:create) do |company|
        company.groups << create(:group, name: 'default')
      end
    end

    trait :with_business_days do
      after(:create) do |company|
        %w[monday tuesday wednesday thursday friday].each do |wday|
          company.business_days << create(:business_day, morning_started_at: '08:00', morning_ended_at: '12:00', afternoon_started_at: '13:30', afternoon_ended_at: '17:30', weekday: wday)
        end
      end
    end
  end
end
