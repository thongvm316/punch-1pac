# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  before_action :current_session

  def index
    authorize!
    sessions = current_user.sessions.where.not(id: current_session)
    render json: sessions,
           root: 'sessions',
           each_serializer: SessionSerializer,
           meta: current_session ? ActiveModelSerializers::SerializableResource.new(current_session, serializer: SessionSerializer) : nil,
           adapter: :json,
           status: 200
  end

  def destroy
    usession = current_user.sessions.find(params[:id])
    authorize!(session: usession, current_session: current_session)
    revoke_jwt!(usession)
    usession.destroy!
    head(200)
  end

  private

  def current_session
    @current_session = current_user.current_session(request)
  end
end
