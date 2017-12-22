# frozen_string_literal: true

class V1::GroupsController < ApplicationController
  before_action :set_group, only: %i[show update destroy]

  def index
    groups = current_company.groups
    render json: groups, each_serializer: GroupSerializer, status: 200
  end

  def show
    render json: @group, serializer: GroupSerializer, status: 200
  end

  def create
    group = current_company.groups.build(group_params)
    if group.save
      render json: group, serializer: GroupSerializer, status: 200
    else
      render_422(group.errors.messages)
    end
  end

  def update
    GroupPermission.where(group_id: @group.id).destroy_all
    if @group.update_attributes(group_params)
      render json: @group, serializer: GroupSerializer, status: 200
    else
      render_422(@group.errors.messages)
    end
  end

  def destroy
    @group.destroy
    head 200
  end

  private

  def group_params
    params.require(:group).permit(:name, group_permissions_attributes: []).tap do |group_params|
      group_params[:group_permissions_attributes] = Permission.where(id: group_params[:group_permissions_attributes]).map { |permission| { permission_id: permission.id } }
    end
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
