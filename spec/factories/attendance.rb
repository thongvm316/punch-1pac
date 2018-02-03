# frozen_string_literal: true

FactoryBot.define do
  factory :attendance do
    association(:user, factory: :user, strategy: :build)
    day { Time.current }
    attended_at { Time.current }
    left_at { Time.current }
    attending_status { %w[attend_ok attend_late][rand(2)] }
    leaving_status { %w[leave_ok leave_early][rand(2)] }
    off_status 'holiday'
  end
end
