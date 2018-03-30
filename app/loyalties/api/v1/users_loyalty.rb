# frozen_string_literal: true

class Api::V1::UsersLoyalty < ApplicationLoyalty
  def show?
    @user.manager? || @user == @record
  end

  def create_multi?
    @user.manager?
  end

  def destroy?
    return true if @user.superadmin? && !@record.superadmin?
    return true if @user.admin? && @record.member?
    false
  end

  def update?
    @user == @record
  end
end
