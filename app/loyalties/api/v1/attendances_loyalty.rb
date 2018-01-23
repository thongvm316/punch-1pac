# frozen_string_literal: true

class Api::V1::AttendancesLoyalty < ApplicationLoyalty
  def create?
    true
  end

  def update?
    true
  end
end
