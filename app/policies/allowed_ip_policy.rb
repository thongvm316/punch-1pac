# frozen_string_literal: true

class AllowedIpPolicy < ApplicationPolicy
  def index?
    @user.manager?
  end

  def create?
    @user.manager?
  end

  def update?
    @user.manager?
  end

  def destroy?
    @user.manager?
  end
end
