# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      token = jwt_encode({ sub: user.id })
      render json: { token: token }, status: 200
    else
      head(401)
    end
  end

  def destroy
    revoke_jwt!
    head(200)
  end
end
