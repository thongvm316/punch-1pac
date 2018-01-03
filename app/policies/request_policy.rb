# frozen_string_literal: true

class RequestPolicy < ApplicationPolicy
  def create?
    true
  end

  def update?
    true
  end

  def approve?
    @user.manager?
  end

  def reject?
    @user.manager?
  end
end
