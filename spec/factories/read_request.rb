# frozen_string_literal: true

FactoryBot.define do
  factory :read_request do
    association(:request, factory: :request, strategy: :build)
    association(:user, factory: :user, strategy: :build)
  end
end
