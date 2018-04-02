# frozen_string_literal: true

FactoryBot.define do
  factory :user_notification do
    association(:user, factory: :user, strategy: :build)
    association(:activity, factory: :activity, strategy: :build)
  end
end
