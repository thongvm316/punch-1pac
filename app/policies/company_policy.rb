# frozen_string_literal: true

class CompanyPolicy < ApplicationPolicy
  def update?
    @user.manager?
  end

  def deactivate?
    @user.superadmin?
  end

  def setup_rules?
    @user.manager?
  end

  def destroy?
    @user.superadmin?
  end
end
