# frozen_string_literal: true

class V1::ReadAnnouncementsController < ApplicationController
  def create
    announcement = Announcement.find(params[:id])
    ReadAnnouncement.find_or_create_by!(announcement: announcement, user: current_user)
    head(200)
  rescue ActiveRecord::RecordNotUnique
    head(200)
  end
end
