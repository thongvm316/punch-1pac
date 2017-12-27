# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    name { Faker::Lorem.word }
    association(:company, factory: :company, strategy: :build)
    group_permissions_attributes do
      permissions = create_list(:permission, 3).pluck(:id)
      permissions.map { |id| { permission_id: id } }
    end
  end
end
