# frozen_string_literal: true

class Api::V1::NotificationsController < Api::V1::BaseController
  include Pagination

  def index
    authorize!
    notifications = current_user.notifications.includes(:user).page(params[:page]).per(params[:per_page])
    render json: notifications,
            root: 'notifications',
            each_serializer: NotificationSerializer,
            adapter: :json,
            meta: pager(notifications).merge(unread_notifications_count: notifications.unread_count(current_user.last_read_noti_id)),
            status: :ok
  end

  def read
    authorize!
    current_user.user_notifications.find_by!(activity_id: params[:id])
    current_user.update!(last_read_noti_id: params[:id])
    head(200)
  end
end
