# frozen_string_literal: true

class PasswordResetMailer < ApplicationMailer
  def create(user_id)
    @user = User.find(user_id)
    @company = @user.company
    @token = @user.reset_password_token

    if Rails.env.development? || Rails.env.test?
      mail(to: @user.email, subject: 'Please reset your password')
    else
      sendgrid_mail(user: @user, company: @company, token: @token, subject: 'Please reset your password', classname: 'password_reset_mailer', filename: 'create')
    end
  end
end
