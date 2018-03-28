# frozen_string_literal: true

class Api::V1::GroupsController < Api::V1::BaseController
  before_action :set_group, only: %i[show update destroy add_user remove_user]

  def index
    authorize!
    groups = current_company.groups.for_user(current_user).includes(:users).order(name: :asc)
    render json: groups, each_serializer: GroupSerializer, status: 200
  end

  def show
    authorize! @group
    render json: @group, serializer: GroupSerializer, status: 200
  end

  def create
    authorize!
    group = current_company.groups.build(group_params)
    if group.save
      render json: group, serializer: GroupSerializer, status: 201
    else
      render_422(group.errors.messages)
    end
  end

  def update
    authorize! @group
    if @group.update(group_params)
      render json: @group, serializer: GroupSerializer, status: 200
    else
      render_422(@group.errors.messages)
    end
  end

  def destroy
    authorize!
    @group.destroy
    head 200
  end

  def add_user
    user = User.find(params[:user_id])
    authorize! @group
    user_group = UserGroup.new(group: @group, user: user)
    if user_group.save
      head(200)
    else
      render_422(user_group.errors.messages)
    end
  end

  def remove_user
    user = User.find(params[:user_id])
    authorize! @group
    user_group = UserGroup.find_by!(group: @group, user: user)
    user_group.destroy
    head(200)
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
