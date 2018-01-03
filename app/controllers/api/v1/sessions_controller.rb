# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: %i[login]
  skip_before_action :set_locale, only: %i[login]

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

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      data = payload(sub: user.id)
      token = jwt_encode(data)
      Session.track!(user, data, request)
      render json: { token: token }, status: 200
    else
      head(401)
    end
  end

  def logout
    revoke_jwt!
    head(200)
  end
end
