# frozen_string_literal: true

class AnnouncementSerializer < ApplicationSerializer
  attributes :id, :title, :content, :target, :status, :created_at

  def created_at
    object.created_at.iso8601
  end
end
