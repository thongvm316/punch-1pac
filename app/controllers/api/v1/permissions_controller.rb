# frozen_string_literal: true

class Api::V1::PermissionsController < Api::V1::BaseController
  def index
    authorize Permission
    permissions = Permission.filter(params)
    render json: permissions, each_serializer: PermissionSerializer, status: 200
  end
end
