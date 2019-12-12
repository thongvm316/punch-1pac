# frozen_string_literal: true

class Api::V1::GroupsLoyalty < ApplicationLoyalty
  def create?
    return true if user.owner? || user.superadmin?
    false
  end

  def update?
    return true if user.owner? || user.superadmin?
    return true if user.admin? && user.groups.include?(record)
    false
  end

  def show?
    update?
  end

  def add_user?
    update?
  end

  def remove_user?
    update?
  end

  def report?
    update?
  end

  def personal_report?
    update?
  end

  def destroy?
    return true if user.owner? || user.superadmin?
    false
  end
end
