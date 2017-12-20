# frozen_string_literal: true

class RequestSerializer < ApplicationSerializer
  attributes :id, :reason, :attended_at, :left_at, :status, :updated_at
  belongs_to :user, serializer: UserSerializer

  def attended_at
    object&.attended_at&.strftime('%H:%M')
  end

  def left_at
    object&.left_at&.strftime('%H:%M')
  end

  def updated_at
    object.updated_at.iso8601
  end
end
