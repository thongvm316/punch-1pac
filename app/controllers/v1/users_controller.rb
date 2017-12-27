# frozen_string_literal: true

class V1::UsersController < ApplicationController
  before_action :set_user, only: %i[update destroy]

  def index
    users = current_company.users
    render json: users, each_serializer: UserSerializer, status: 200
  end

  def show
    user = User.includes(:permissions).find(params[:id])
    render json: user, serializer: UserWithPermissionSerializer, status: 200
  end

  def create
    user = current_company.users.build(user_params)
    if user.save
      render json: user, serializer: UserSerializer, status: 201
    else
      render_422(user.errors.messages)
    end
  end

  def create_multi
    users_form = UserCreateMultiForm.new(current_company, params[:csv_file])
    if users_form.save
      render json: users_form.result, status: 201
    else
      render_422(users_form.errors.messages)
    end
  end

  def update
    @user.user_permissions.destroy_all if user_params[:user_permissions_attributes].present?
    if @user.update_attributes(user_params)
      render json: @user, serializer: UserSerializer, status: 200
    else
      render_422(@user.errors.messages)
    end
  end

  def destroy
    @user.destroy
    head(200)
  end

  private

  def user_params
    params.require(:user).permit(:department_id, :name, :password, :password_confirmation, :email,
                                 :role, user_permissions_attributes: []).tap do |p|
      p[:user_permissions_attributes] = Permission.verify(params.require(:user)[:permission_ids])
    end
  end

  def set_user
    @user = User.find(params[:id])
  end
end
