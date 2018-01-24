# frozen_string_literal: true

class Api::V1::HolidaysLoyalty < ApplicationLoyalty
  def import?
    @user.manager?
  end

  def company_destroy?
    @user.manager?
  end
end