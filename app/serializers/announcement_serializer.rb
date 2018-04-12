# frozen_string_literal: true

class AnnouncementSerializer < ApplicationSerializer
  attributes :id, :content, :due_date, :target, :status, :readed, :created_at

  def created_at
    object.created_at.iso8601
  end

  def readed
    ReadAnnouncement.exists?(announcement: object, user: @instance_options[:current_user])
  end
end
