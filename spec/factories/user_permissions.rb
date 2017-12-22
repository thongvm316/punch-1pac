# frozen_string_literal: true

FactoryBot.define do
  factory :user_permission do
    association :permission, strategy: :build
    association :user, strategy: :build
  end
end
