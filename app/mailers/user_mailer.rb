# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def create(user_id, company_id, user_pwd)
    @user = User.find_by(id: user_id)
    @company = Company.find_by(id: company_id)
    @password = user_pwd
    mail(to: @user.email, subject: "[1Punch] Invitation from #{@company.name}")
  end
end
