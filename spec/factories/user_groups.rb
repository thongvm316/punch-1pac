# frozen_string_literal: true

FactoryBot.define do
  factory :user_group do
    association(:user, factory: :user, strategy: :build)
    association(:group, factory: :group, strategy: :build)
  end
end
