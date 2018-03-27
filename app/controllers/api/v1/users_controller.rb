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
    user_form = UserCreateForm.new(user_create_params, current_user)
    if user_form.save
      UserMailer.create(user_form.user.id, current_company.id, user_create_params[:password]).deliver_later
      render json: user_form.user, serializer: UserSerializer, status: 201
    else
      render_422(user_form.error_messages)
    end
  end

  def change_password
    errors = {}
    errors[:current_password] = [I18n.t('errors.messages.incorrect')] unless current_user.authenticate(params[:current_password])
    errors[:password] = [I18n.t('errors.messages.blank')] if params[:password].blank?

    if current_user.update(password_params) && errors.blank?
      head(200)
    else
      render_422(current_user.errors.messages.merge(errors))
    end
  end

  def create_multi
    authorize!
    @users_form = UserCreateMultiForm.new(current_company, params[:csv_file])
    if @users_form.save
      render json: @users_form.result, status: :created
    else
      render_422(@users_form.errors.messages)
    end
  end

  def update
    authorize! @user
    if @user.update(user_update_params)
      render json: @user, serializer: UserWithPermissionSerializer, status: 200
    else
      render_422(@user.errors)
    end
  end

  def destroy
    authorize! @user
    @user.destroy
    head(200)
  end

  private

  def user_create_params
    params.require(:user).permit(:name, :password, :password_confirmation, :email, :role, :group_id, permission_ids: []).tap do |p|
      p[:password] = SecureRandom.hex(10)
      p[:password_confirmation] = p[:password]
    end
  end

  def user_update_params
    params.require(:user).permit(:gender, :name, :email, :avatar, :language, :position)
  end

  def password_params
    params.permit(:password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
