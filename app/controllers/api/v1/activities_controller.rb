# frozen_string_literal: true

class Api::V1::ActivitiesController < Api::V1::BaseController
  include Pagination

  def index
    authorize!
    activities = current_user.activities.page(params[:page]).per(params[:per_page])
    render json: activities,
           root: 'activities',
           each_serializer: ActivitySerializer,
           adapter: :json,
           meta: pager(activities),
           status: :ok
  end
end
