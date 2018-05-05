# frozen_string_literal: true

class AuthController < ApplicationController
  layout 'static'
  before_action :current_company
  before_action :authenticate_user!, only: %i[destroy]

  helper_method :current_company

  def new
    respond_to do |f|
      f.html do
        redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') && return if signed_in?
        @user = User.new
      end
      f.json { render json: current_company, serializer: CompanySerializer, status: 200 }
    end
  end

  def create
    head(200) if signed_in?
    @user = current_company.users.find_by(email: auth_params[:email])
    respond_to do |f|
      if @user&.authenticate(auth_params[:password])
        token = jwt_encode(sub: @user.id)
        update_session!
        f.html do
          session[:access_token] = token
          redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') && return
        end
        f.json do
          user_json = ActiveModelSerializers::SerializableResource.new(@user, serializer: UserSerializer).as_json
          render(json: user_json.merge(access_token: token), status: :ok)
        end
      else
        f.html do
          flash.now[:alert] = if current_company.users.unscope(where: :activated).find_by(activated: false, email: auth_params[:email])
                                'Oops!!! Your account is deactivated. Please contact your manager'
                              else
                                'Incorrect email or password'
                              end
          @user = User.new(email: auth_params[:email])
          render(:new)
        end
        f.json { head(401) }
      end
    end
  end

  def destroy
    revoke_jwt!
    session.delete(:access_token)
    render json: { access_token: token }, status: :ok
  end

  private

  def update_session!
    current_session = @user.current_session(request)
    current_session ? current_session.touch(:updated_at) : Session.track!(@user, data, request)
  end

  def auth_params
    params.require(:user).permit(:email, :password)
  end
end
