# frozen_string_literal: true

FactoryBot.define do
  factory :activity do
    association(:user, factory: :user, strategy: :build)
    activitable_id 1
    activitable_type 'Attendance'
    kind 'punch_in'
  end
end
