# frozen_string_literal: true

class Api::V1::AllowedIpsController < Api::V1::BaseController
  before_action :set_allowed_ip, only: %i[update destroy]

  def index
    authorize!
    allowed_ips = current_company.allowed_ips
    render json: allowed_ips, each_serializer: AllowedIpSerializer, status: 200 if stale?(allowed_ips)
  end

  def create
    authorize!
    allowed_ip = current_company.allowed_ips.build(allowed_ip_params)
    if allowed_ip.save
      render json: allowed_ip, serializer: AllowedIpSerializer, status: 201
    else
      render_422(allowed_ip.errors.messages)
    end
  end

  def update
    authorize!
    if @allowed_ip.update(allowed_ip_params)
      render json: @allowed_ip, serializer: AllowedIpSerializer, status: 200
    else
      render_422(@allowed_ip.errors.messages)
    end
  end

  def destroy
    authorize!
    @allowed_ip.destroy
    head(200)
  end

  private

  def allowed_ip_params
    params.require(:allowed_ip).permit(:ip_address)
  end

  def set_allowed_ip
    @allowed_ip = current_company.allowed_ips.find(params[:id])
  end
end
