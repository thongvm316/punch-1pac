# frozen_string_literal: true

class V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: %i[create]

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = jwt_encode(sub: user.id)
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
