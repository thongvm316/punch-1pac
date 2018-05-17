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
        PasswordResetMailer.create(@user.id).deliver_later
        f.html do
          flash[:notice] = "A password reset email has been sent to #{@user.email}."
          redirect_to login_url
        end
        f.json { head(200) }
      else
        msg = 'Invalid email. Please try another.'
        f.html do
          flash.now[:alert] = msg
          render :new
        end
        f.json { render json: { message: msg }, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @user = User.reset_password_token_valid?(params[:token])
  rescue AppErrors::ExpiredResetPwdToken
    flash[:alert] = 'This reset password token is expired. Please try again.'
    redirect_to password_reset_url
  rescue AppErrors::InvalidResetPwdToken
    flash[:alert] = 'Invalid reset password token. Please try again.'
    redirect_to password_reset_url
  end

  def update
    @user = User.reset_password_token_valid?(params[:token])
    if @user.update(user_params.merge(reset_password_token: nil, password_changed: true))
      flash[:notice] = 'Password has been reset'
      redirect_to login_url
    else
      render :edit
    end
  rescue AppErrors::ExpiredResetPwdToken
    flash[:alert] = 'This reset password token is expired. Please try again.'
    redirect_to password_reset_url
  rescue AppErrors::InvalidResetPwdToken
    flash[:alert] = 'Invalid reset password token. Please try again.'
    redirect_to password_reset_url
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
