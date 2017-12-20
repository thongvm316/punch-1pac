# frozen_string_literal: true

class V1::ReadRequestsController < ApplicationController
  def create
    req = Request.find(params[:id])
    ReadRequest.find_or_create_by!(user: current_user, request: req)
    head(200)
  rescue ActiveRecord::RecordNotUnique
    head(200)
  end
end
