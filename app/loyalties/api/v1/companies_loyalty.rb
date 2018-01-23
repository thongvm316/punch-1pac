# frozen_string_literal: true

class Api::V1::CompanyLoyalty < ApplicationLoyalty
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
