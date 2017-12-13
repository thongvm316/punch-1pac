# frozen_string_literal: true

class V1::UsersController < ApplicationController
  before_action :set_user, only: %i[update destroy]

  def index
    users = current_company.users
    render json: users, each_serializer: UserSerializer, status: 200
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, serializer: UserSerializer, status: 200
    else
      render_422(user.errors.messages)
    end
  end

  def create_multi
    results = User.import_csv(params[:csv_file].tempfile, current_company.id)
    users = ActiveModelSerializers::SerializableResource.new(results[:users], each_serializer: UserSerializer).as_json
    render json: { users: users, errors: results[:errors] }, status: 200
  end

  def update
    if @user.update_attributes(update_user_params)
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
    u_params = params.require(:user).permit(:department_id, :name, :password, :password_confirmation, :email)
    u_params.merge(company_id: current_company.id)
  end

  def update_user_params
    params.require(:user).permit(:name, :email)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
