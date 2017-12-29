# frozen_string_literal: true

class CompanyPolicy < ApplicationPolicy
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
