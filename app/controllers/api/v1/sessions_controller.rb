# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  def index
    sessions = current_user.sessions
    render json: sessions, each_serializer: SessionSerializer, status: 200
  end

  def destroy
    usession = current_user.sessions.find(params[:id])
    revoke_jwt!(usession)
    usession.destroy!
    head(200)
  end
end
