# frozen_string_literal: true

class V1::PermissionsController < ApplicationController
  def index
    authorize Permission
    permissions = Permission.filter(params)
    render json: permissions, each_serializer: PermissionSerializer, status: 200
  end
end
