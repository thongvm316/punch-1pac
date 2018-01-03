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
      render json: group, serializer: GroupSerializer, status: 201
    else
      render_422(group.errors.messages)
    end
  end

  def update
    @group.group_permissions.destroy_all if group_params[:group_permissions_attributes].present?
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
    params.require(:group).permit(:name, group_permissions_attributes: []).tap do |p|
      p[:group_permissions_attributes] = Permission.verify(params.require(:group)[:permission_ids])
    end
  end

  def set_group
    @group = Group.find(params[:id])
  end
end