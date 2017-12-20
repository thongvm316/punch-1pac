# frozen_string_literal: true

FactoryBot.define do
  factory :attendance do
    association(:user, factory: :user, strategy: :build)
    day { Time.current }
    attended_at { Time.current }
    left_at { Time.current }
    attending_status 'attend_late'
    leaving_status 'leave_early'
    off_status 'holiday'
  end
end
