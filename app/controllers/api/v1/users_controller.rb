# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: %i[show update destroy]

  def index
    authorize User
    users = current_company.users
    render json: users, each_serializer: UserSerializer, status: 200
  end

  def show
    authorize @user
    render json: @user, serializer: UserWithPermissionSerializer, status: 200
  end

  def create
    authorize User
    user = current_company.users.build(user_params)
    if user.save
      UserMailer.create(user.id, user_params[:password]).deliver_later
      render json: user, serializer: UserSerializer, status: 201
    else
      render_422(user.errors.messages)
    end
  end

  def create_multi
    authorize User
    @users_form = UserCreateMultiForm.new(current_company, params[:csv_file])
    if @users_form.save
      render json: @users_form.result, status: 201
    else
      render_422(@users_form.errors.messages)
    end
  end

  def update
    authorize @user

    ApplicationRecord.transaction do
      @user.user_permissions.destroy_all if @current_user.manager?
      @user.update_attributes!(user_params)
    end

    render json: @user, serializer: UserWithPermissionSerializer, status: 200
  rescue ActiveRecord::RecordInvalid
    render_422(@user.errors.messages)
  end

  def destroy
    authorize @user
    @user.destroy
    head(200)
  end

  private

  def user_params
    params[:user][:user_permissions_attributes] = Permission.verify(params[:user][:permission_ids])
    params.require(:user).permit(policy(current_user).permitted_attributes)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
