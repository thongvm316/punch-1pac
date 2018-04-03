# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  attributes :id, :activitable_id, :activitable_type, :kind
  belongs_to :user, serializer: UserSerializer
end
