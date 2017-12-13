# frozen_string_literal: true

class V1::UsersController < ApplicationController
  before_action :user_params, only: [:create]

  def index
    users = User.where(company_id: current_user.company.id)
    render json: users, each_serializer: UserSerializer, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, serializer: UserSerializer, status: :ok
    else
      render_422(user.errors.messages)
    end
  end

  def import_csv
    results = User.import_csv(csv_params, current_user.company.id)
    users = results[:users].map { |user| UserSerializer.new(user) }
    errors = results[:errors]
    render json: { users: users, errors: errors }, status: :ok
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(update_user_params)
    render json: user, serializer: UserSerializer, status: :ok
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: user, serializer: UserSerializer, status: :ok
  end

  private

  def user_params
    u_params = params.require(:user).permit(:department_id,
                                            :name,
                                            :password,
                                            :password_confirmation,
                                            :email)
    u_params.merge(company_id: current_user.company.id)
  end

  def update_user_params
    params.require(:user).permit(:name, :email)
  end

  def csv_params
    params.permit(:csv_file)[:csv_file].tempfile
  end
end
