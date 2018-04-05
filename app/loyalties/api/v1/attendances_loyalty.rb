# frozen_string_literal: true

class Api::V1::AttendancesLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def create?
    true
  end

  def update?
    true
  end

  def calendar?
    true
  end

  def chart?
    true
  end
end
