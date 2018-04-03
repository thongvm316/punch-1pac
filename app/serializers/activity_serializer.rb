# frozen_string_literal: true

class ActivitySerializer < ApplicationSerializer
  attributes :id, :activitable_id, :activitable_type, :kind
  belongs_to :user, serializer: UserSerializer
end
