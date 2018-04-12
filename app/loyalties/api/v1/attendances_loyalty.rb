# frozen_string_literal: true

class Api::V1::AttendancesLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def today?
    true
  end

  def create?
    @user.superadmin? || @user == @record
  end

  def update?
    @user.superadmin? || @user == @record
  end

  def calendar?
    true
  end

  def chart?
    true
  end
end
