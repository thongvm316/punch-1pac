# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def create(user_id, user_pwd)
    @user = User.find_by(id: user_id)
    @company = @user.company
    @password = user_pwd
    mail(to: @user.email, subject: "[1Punch] Invitation from #{@company.name}")
  end
end
