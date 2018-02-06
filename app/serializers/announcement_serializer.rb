# frozen_string_literal: true

class AnnouncementSerializer < ApplicationSerializer
  attributes :id, :title, :content, :target, :status, :has_read, :created_at

  def created_at
    object.created_at.iso8601
  end

  def has_read
    ReadAnnouncement.exists?(announcement: object, user: current_user)
  end
end
