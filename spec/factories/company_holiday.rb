# frozen_string_literal: true

FactoryBot.define do
  factory :company_holiday do
    association(:company, factory: :company, strategy: :build)
    association(:holiday, factory: :holiday, strategy: :build)
  end
  trait :with_system_holiday do
    after(:create) do
      create(:holiday, country: 'en')
    end
  end
end
