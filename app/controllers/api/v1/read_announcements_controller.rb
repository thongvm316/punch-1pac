# frozen_string_literal: true

class Api::V1::ReadAnnouncementsController < Api::V1::BaseController
  def create
    authorize!
    announcement = Announcement.find(params[:id])
    ReadAnnouncement.find_or_create_by!(announcement: announcement, user: current_user)
    head(200)
  rescue ActiveRecord::RecordNotUnique
    head(200)
  end
end
