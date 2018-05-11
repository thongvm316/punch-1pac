# frozen_string_literal: true

class Api::V1::UsersLoyalty < ApplicationLoyalty
  def show?
    @user.manager? || @user == @record
  end

  def create_multi?
    @user.manager?
  end

  def change_password?
    true
  end

  def today_attendances?
    @user.superadmin?
  end

  def destroy?
    return false if @record.owner?
    return true if @user.owner?
    return true if @user.superadmin?
    return true if @user.admin? && @record.member?
    false
  end

  def update?
    return true if @user.owner?
    return true if @user.superadmin? && !@record.owner?
    return true if @user.admin? && @record.member?
    return true if @user == @record
    false
  end

  def activate?
    return false if @record.owner?
    return true if @user.owner?
    return true if @user.superadmin?
    return true if @user.admin? && @record.member?
    false
  end

  def deactivate?
    return false if @record.owner?
    return true if @user.owner?
    return true if @user.superadmin?
    return true if @user.admin? && @record.member?
    false
  end

  def permitted_attributes
    if @user.owner? || (@user.superadmin? && !@record.owner?)
      %w[gender name email avatar language position role]
    elsif (@user.admin? && @record.member?) || (@user == @record)
      %w[gender name email avatar language position]
    end
  end

  def group_pending_requests?
    @user.manager?
  end
end
