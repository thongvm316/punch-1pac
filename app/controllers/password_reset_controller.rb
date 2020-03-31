# frozen_string_literal: true

class PasswordResetController < ApplicationController
  layout 'page'
  before_action :current_company

  def new
    @user = User.new
  end

  def create
    @user = current_company.users.find_by(email: params[:user][:email])
    respond_to do |f|
      if @user
        @user.init_password_reset_token!
        PasswordResetMailer.create(@user.id).deliver
        f.html do
          flash[:notice] = t('.valid_email', email: @user.email)
          redirect_to login_url
        end
        f.json { head(200) }
      else
        msg = t('.invalid_email')
        f.html do
          flash.now[:alert] = msg
          @user = User.new
          render :new
        end
        f.json { render json: { message: msg }, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @user = User.reset_password_token_valid?(params[:token])
  rescue AppErrors::ExpiredResetPwdToken
    flash[:alert] = t('.reset_token_expired')
    redirect_to password_reset_url
  rescue AppErrors::InvalidResetPwdToken
    flash[:alert] = t('.reset_token_invalid')
    redirect_to password_reset_url
  end

  def update
    @user = User.reset_password_token_valid?(params[:token])
    if @user.update(user_params.merge(reset_password_token: nil, password_changed: true))
      flash[:notice] = t('.password_reset_success')
      redirect_to login_url
    else
      render :edit
    end
  rescue AppErrors::ExpiredResetPwdToken
    flash[:alert] = t('.reset_token_expired')
    redirect_to password_reset_url
  rescue AppErrors::InvalidResetPwdToken
    flash[:alert] = t('.reset_token_invalid')
    redirect_to password_reset_url
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
