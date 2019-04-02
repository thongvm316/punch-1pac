# frozen_string_literal: true

class Api::V1::DeviceTokensController < Api::V1::BaseController
  def create
    authorize!
    device_token = current_user.device_tokens.build(token_params)
    if device_token.save
      render json: device_token, serializer: DeviceTokenSerializer, status: :created
    else
      render_422(device_token.errors.messages)
    end
  end

  def destroy
    authorize!
    device_token = DeviceToken.find_by!(device_token: token_params[:device_token])
    device_token.destroy
    head(200)
  end

  private

  def token_params
    params.permit(:device_token, :device_type)
  end
end
