# frozen_string_literal: true

FactoryBot.define do
  factory :read_announcement do
    association(:announcement, factory: :announcement, strategy: :build)
    association(:user, factory: :user, strategy: :build)
  end
end
