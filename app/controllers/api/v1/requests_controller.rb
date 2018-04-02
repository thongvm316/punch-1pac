# frozen_string_literal: true

class Api::V1::RequestsController < Api::V1::BaseController
  include Pagination

  before_action :set_request, only: %i[update destroy approve reject]

  def index
    authorize!
    requests = Request.for_user(current_user, params['self'])
                      .search_by(params)
                      .includes(:user, :attendance)
                      .page(params[:page])
                      .per(params[:per_page])
                      .order('attendances.id DESC')
    render json: requests,
           root: 'requests',
           each_serializer: RequestSerializer,
           adapter: :json,
           meta: pager(requests),
           status: 200
  end

  def create
    authorize!
    req = current_user.requests.build(request_params)
    if req.save
      TrackAndNotifyActivityWorker.perform_async(current_user.id, req.id, req.class.to_s, 'create')
      render json: req, serializer: RequestSerializer, status: 201
    else
      render_422(req.errors.messages)
    end
  end

  def update
    authorize! @req
    if @req.update(request_params)
      TrackAndNotifyActivityWorker.perform_async(current_user.id, @req.id, @req.class.to_s, 'update')
      render json: @req, serializer: RequestSerializer, status: 200
    else
      render_422(@req.errors.messages)
    end
  end

  def approve
    authorize! @req
    RequestService.new(current_user, @req).approve
    TrackAndNotifyActivityWorker.perform_async(current_user.id, @req.id, @req.class.to_s, 'approve')
    head(200)
  end

  def reject
    authorize! @req
    RequestService.new(current_user, @req).reject
    TrackAndNotifyActivityWorker.perform_async(current_user.id, @req.id, @req.class.to_s, 'reject')
    head(200)
  end

  def destroy
    authorize! @req
    @req.destroy
    head(200)
  end

  private

  def request_params
    params.require(:request).permit(:attendance_id, :reason, :attended_at, :left_at, :status)
  end

  def set_request
    @req = Request.find(params[:id])
  end
end
