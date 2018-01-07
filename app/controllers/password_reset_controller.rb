# frozen_string_literal: true

class PasswordResetController < ApplicationController
  before_action :current_company

  def new
    @user = User.new
  end

  def create
    @user = current_company.users.find_by(email: params[:email])
    respond_to do |f|
      if @user
        @user.init_password_reset_token!
        PasswordResetMailer.create(@user.id).deliver_later
        f.html { render :create }
        f.json { head(200) }
      else
        @msg = 'Invalid email. Please try another.'
        f.html { render :new }
        f.json { render json: { message: @msg }, status: 422 }
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
    if @user.update_attributes(user_params)
      flash[:notice] = 'New password is updated'
      redirect_to login_url
    else
      @errors = @user.errors.messages
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
    params.permit(:password, :password_confirmation)
  end
end
