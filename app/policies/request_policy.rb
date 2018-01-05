# frozen_string_literal: true

class RequestPolicy < ApplicationPolicy
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
    @user.manager? && @record.pending?
  end

  def reject?
    @user.manager? && @record.pending?
  end

  def destroy?
    @record.user == @user && @record.pending?
  end
end
