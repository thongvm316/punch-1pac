# frozen_string_literal: true

class Api::V1::AnnouncementsController < Api::V1::BaseController
  include Pagination

  def index
    announcements = Announcement.for_user(current_user).search_by(params, current_user.id).page(params[:page]).per(params[:per_page])

    render json: announcements,
           root: 'announcements',
           each_serializer: AnnouncementSerializer,
           adapter: :json,
           meta: pager(announcements),
           status: 200
  end

  def show
    announcement = Announcement.for_user(current_user).find(params[:id])
    render json: announcement, serializer: AnnouncementSerializer, status: 200
  end
end
