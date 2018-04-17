# frozen_string_literal: true

class Api::V1::RequestsLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def create?
    true
  end

  def update?
    @record.user == @user && @record.pending?
  end

  def approve?
    return false unless @record.pending?
    return true if @user.superadmin? || @user.owner?
    return true if @user.admin? && @record.user.groups.select { |group| @user.groups.include?(group) }.present?
    false
  end

  def reject?
    approve?
  end

  def destroy?
    @record.user == @user
  end
end
