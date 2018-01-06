# frozen_string_literal: true

class TokenController < ApplicationController
  before_action :authenticate_user, only: %i[destroy]

  def create
    user = current_company.users.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      data = payload(sub: user.id)
      token = jwt_encode(data)
      Session.track!(user, data, request)
      session[:access_token] = token if request.xhr?
      render json: { access_token: token }, status: 200
    else
      head(401)
    end
  end

  def destroy
    revoke_jwt!
    session.delete(:access_token) if request.xhr?
    render json: { access_token: token }, status: 200
  end
end
