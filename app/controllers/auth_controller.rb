# frozen_string_literal: true

class AuthController < ApplicationController
  layout 'static'
  before_action :current_company
  before_action :authenticate_user!, only: %i[destroy]

  def new
    redirect_to(url_for(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard')) && return if signed_in?
    @user = User.new
  end

  def create
    head(200) if signed_in?
    @user = current_company.users.find_by(email: auth_params[:email])
    respond_to do |f|
      if @user&.authenticate(auth_params[:password])
        data = payload(sub: @user.id)
        token = jwt_encode(data)
        Session.track!(@user, data, request)
        f.html do
          session[:access_token] = token
          redirect_to(url_for(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard'))
        end
        f.json { render json: { access_token: token }, status: 200 }
      else
        f.html do
          @user = User.new(email: auth_params[:email])
          flash.now[:alert] = 'Incorrect email or password'
          render :new
        end
        f.json { head(401) }
      end
    end
  end

  def destroy
    revoke_jwt!
    session.delete(:access_token)
    render json: { access_token: token }, status: 200
  end

  private

  def auth_params
    params.require(:user).permit(:email, :password)
  end
end
