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
    user_form = UserCreateSingleForm.new(user_params, current_company, current_user)
    if user_form.save
      UserMailer.create(user_form.user.id, user_params[:password]).deliver_later
      render json: user_form.user, serializer: UserSerializer, status: 201
    else
      render_422(user_form.error_messages)
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
    user_form = UserCreateSingleForm.new(user_params, current_company, current_user, @user)
    if user_form.save
      render json: user_form.user, serializer: UserWithPermissionSerializer, status: 200
    else
      render_422(user_form.error_messages)
    end
  end

  def destroy
    authorize! @user
    @user.destroy
    head(200)
  end

  private

  def user_params
    params.require(:user).permit(loyalty(current_user).permitted_attributes)
  end

  def password_params
    params.permit(:password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
