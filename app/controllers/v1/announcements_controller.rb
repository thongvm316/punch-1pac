# frozen_string_literal: true

class V1::AnnouncementsController < ApplicationController
  def index
    announcements = Announcement.for_user(current_user)
    render json: announcements, each_serializer: AnnouncementSerializer, status: 200
  end

  def latest
    announcements = Announcement.for_user(current_user).unread(current_user.id).order(status: :desc).first
    render json: announcements, serializer: AnnouncementSerializer, status: 200
  end

  def show
    announcement = Announcement.for_user(current_user).find(params[:id])
    render json: announcement, serializer: AnnouncementSerializer, status: 200
  end
end
