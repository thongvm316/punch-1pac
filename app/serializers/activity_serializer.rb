# frozen_string_literal: true

class ActivitySerializer < ApplicationSerializer
  attributes :id, :activitable_id, :activitable_type, :kind, :created_at
  belongs_to :user, serializer: UserSerializer

  def created_at
    object.created_at.iso8601
  end
end
