# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def create(user_id, company_id, user_pwd)
    @user = User.find_by(id: user_id)
    @company = Company.find_by(id: company_id)
    @password = user_pwd

    if Rails.env.development? || Rails.env.test?
      mail(to: @user.email, subject: "Invitation from #{@company.name}")
    else
      sendgrid_mail(user: @user, company: @company, password: @password, subject: "Invitation from #{@company.name}", classname: 'user_mailer', filename: 'create')
    end
  end
end
