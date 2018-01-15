# frozen_string_literal: true

class PasswordResetMailer < ApplicationMailer
  def create(user_id)
    @user = User.find(user_id)
    @company = @user.company
    @token = @user.reset_password_token
    mail(to: @user.email, subject: '[1Punch] Please reset your password')
  end
end
