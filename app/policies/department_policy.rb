# frozen_string_literal: true

class DepartmentPolicy < ApplicationPolicy
  def index?
    @user.manager?
  end

  def show?
    @user.manager?
  end

  def update?
    @user.manager?
  end

  def create?
    @user.manager?
  end
end
