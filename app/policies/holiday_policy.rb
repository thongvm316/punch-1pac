# frozen_string_literal: true

class HolidayPolicy < ApplicationPolicy
  def import?
    @user.manager?
  end

  def company_destroy?
    @user.manager?
  end
end
