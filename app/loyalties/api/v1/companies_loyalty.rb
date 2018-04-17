# frozen_string_literal: true

class Api::V1::CompaniesLoyalty < ApplicationLoyalty
  def deactivate?
    @user.superadmin?
  end

  def destroy?
    @user.superadmin?
  end
end
