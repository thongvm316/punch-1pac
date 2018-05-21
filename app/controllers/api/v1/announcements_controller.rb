# frozen_string_literal: true

class Api::V1::AnnouncementsController < Api::V1::BaseController
  include Pagination

  def index
    authorize!
    announcements = Announcement.for_user(current_user).search_by(params, current_user.id).page(params[:page]).per(params[:per_page])

    render json: announcements,
           root: 'announcements',
           each_serializer: AnnouncementSerializer,
           adapter: :json,
           meta: pager(announcements),
           status: :ok
  end

  def show
    authorize!
    announcement = Announcement.for_user(current_user).find(params[:id])
    render json: announcement, serializer: AnnouncementSerializer, status: :ok
  end
end
