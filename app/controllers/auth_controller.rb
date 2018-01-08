# frozen_string_literal: true

class AuthController < ApplicationController
  before_action :current_company
  before_action :authenticate_user!, only: %i[destroy]

  def new
    redirect_to(url_for(subdomain: request.subdomain, script_name: '/dashboard')) && return if signed_in?
    @user = User.new
  end

  def create
    head(200) if signed_in?
    @user = current_company.users.find_by(email: params[:email])
    respond_to do |f|
      if @user&.authenticate(params[:password])
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
          @msg = 'Incorrect email or password'
          render :new
        end
        f.json { head(401) }
      end
    end
  end

  def destroy
    revoke_jwt!
    respond_to do |f|
      f.html do
        session.delete(:access_token)
        redirect_to login_url
      end
      f.json { render json: { access_token: token }, status: 200 }
    end
  end
end
