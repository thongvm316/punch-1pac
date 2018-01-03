# frozen_string_literal: true

class Api::V1::ReadRequestsController < Api::V1::BaseController
  def create
    req = Request.find(params[:id])
    ReadRequest.find_or_create_by!(user: current_user, request: req)
    head(200)
  rescue ActiveRecord::RecordNotUnique
    head(200)
  end
end
