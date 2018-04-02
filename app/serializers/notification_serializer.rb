# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  attributes :id, :user_id, :activitable_id, :activitable_type, :kind
end
