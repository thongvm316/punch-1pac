# frozen_string_literal: true

class PermissionPolicy < ApplicationPolicy
  def index?
    @user.manager?
  end
end
