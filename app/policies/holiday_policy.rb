# frozen_string_literal: true

class HolidayPolicy < ApplicationPolicy
  def index?
    @user.manager?
  end

  def import?
    @user.manager?
  end

  def company_destroy?
    @user.manager?
  end
end
