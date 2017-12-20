# frozen_string_literal: true

class V1::RequestsController < ApplicationController
  include Pagination

  before_action :set_request, only: %i[update destroy]

  def index
    requests = Request.page(params[:page]).per(params[:per_page])
    render json: requests,
           root: 'requests',
           each_serializer: RequestSerializer,
           adapter: :json,
           meta: pager(requests),
           status: 200
  end

  def create
    req = current_user.requests.build(request_params)
    if req.save
      render json: req, serializer: RequestSerializer, status: 201
    else
      render_422(req.errors.messages)
    end
  end

  def update
    if @req.update_attributes(request_params)
      render json: @req, serializer: RequestSerializer, status: 200
    else
      render_422(@req.errors.messages)
    end
  end

  def approve
    RequestService.new(current_user, params[:id]).approve
    head(200)
  end

  def reject
    RequestService.new(current_user, params[:id]).reject
    head(200)
  end

  def destroy
    @req.destroy
    head(200)
  end

  private

  def request_params
    params.require(:request).permit(:attendance_id, :reason, :attended_at, :left_at, :status)
  end

  def set_request
    @req = current_user.requests.find(params[:id])
  end
end
