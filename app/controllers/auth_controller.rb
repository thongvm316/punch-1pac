# frozen_string_literal: true

class AuthController < ApplicationController
  layout 'page'
  before_action :current_company
  before_action :authenticate_user!, only: %i[destroy]

  helper_method :current_company

  def new
    respond_to do |f|
      f.html do
        return redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') if signed_in?
        flash.now[:alert] = params[:error_msg] if params[:error_msg].present?
        @user = User.new
      end
      f.json { render json: current_company, serializer: CompanySerializer, status: 200 }
    end
  end

  def create
    respond_to do |f|
      if signed_in?
        handle_signed_in!(f)
      else
        @user = current_company.users.find_by(email: auth_params[:email])

        if @user&.authenticate(auth_params[:password])
          handle_success_login!(f)
        else
          handle_failed_login!(f)
        end
      end
    end
  end

  def destroy
    revoke_jwt!
    session.delete(:access_token)
    render json: { access_token: token }, status: :ok
  end

  private

  def handle_signed_in!(format)
    format.html { redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard') }
    format.json { head(200) }
  end

  def handle_success_login!(format)
    token = jwt_encode(sub: @user.id)
    update_session!
    format.html do
      session[:access_token] = token
      redirect_to(subdomain: request.subdomain, controller: 'dashboard', action: 'index', path: 'dashboard')
    end
    format.json do
      user_json = ActiveModelSerializers::SerializableResource.new(@user, serializer: UserSerializer).as_json
      render(json: user_json.merge(access_token: token), status: :ok)
    end
  end

  def handle_failed_login!(format)
    format.html do
      flash.now[:alert] = if current_company.users.unscope(where: :activated).find_by(activated: false, email: auth_params[:email])
                            I18n.t('auth.messages.deactivated_user')
                          else
                            I18n.t('auth.messages.invalid_user_password')
                          end
      @user = User.new(email: auth_params[:email])
      render(:new)
    end
    format.json { head(401) }
  end

  def update_session!
    current_session = @user.current_session(request)
    current_session ? current_session.touch(:updated_at) : Session.track!(@user, payload(sub: @user.id), request)
  end

  def auth_params
    params.require(:user).permit(:email, :password)
  end
end
