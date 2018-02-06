# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: %i[show update destroy]
  include Pagination

  def index
    authorize!
    users = current_company.users.search_by(params).page(params[:page]).per(params[:per_page])
    render json: users,
           root: 'users',
           each_serializer: UserSerializer,
           adapter: :json,
           meta: pager(users)
  end

  def show
    authorize! @user
    render json: @user, serializer: UserWithPermissionSerializer, status: 200
  end

  def create
    authorize!
    user = current_company.users.build(user_params)
    if user.save
      UserMailer.create(user.id, user_params[:password]).deliver_later
      render json: user, serializer: UserSerializer, status: 201
    else
      render_422(user.errors.messages)
    end
  end

  def change_password
    render_422(current_password: [I18n.t('errors.messages.incorrect')]) && return unless current_user.authenticate(params[:current_password])
    render_422(current_user.errors.messages) && return unless current_user.update_attributes(password_params)
    head(200)
  end

  def create_multi
    authorize!
    @users_form = UserCreateMultiForm.new(current_company, params[:csv_file])
    if @users_form.save
      render json: @users_form.result, status: 201
    else
      render_422(@users_form.errors.messages)
    end
  end

  def update
    authorize! @user

    ApplicationRecord.transaction do
      @user.user_permissions.destroy_all if @current_user.manager?
      @user.update_attributes!(user_params)
    end

    render json: @user, serializer: UserWithPermissionSerializer, status: 200
  rescue ActiveRecord::RecordInvalid
    render_422(@user.errors.messages)
  end

  def destroy
    authorize! @user
    @user.destroy
    head(200)
  end

  private

  def user_params
    params[:user][:user_permissions_attributes] = Permission.verify(params[:user][:permission_ids])
    params.require(:user).permit(loyalty(current_user).permitted_attributes)
  end

  def password_params
    params.permit(:password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
