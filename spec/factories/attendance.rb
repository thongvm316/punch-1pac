# frozen_string_literal: true

FactoryBot.define do
  factory :attendance do
    association(:user, factory: :user, strategy: :build)
    day { Time.current }
    attended_at { Time.current }
    left_at { Time.current }
    status { ['attend_late', 'leave_early'] }
  end
end
