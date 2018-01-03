# frozen_string_literal: true

class AttendancePolicy < ApplicationPolicy
  def create?
    true
  end

  def update?
    true
  end
end
