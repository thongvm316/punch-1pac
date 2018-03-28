# frozen_string_literal: true

class Api::V1::GroupsLoyalty < ApplicationLoyalty
  def update?
    return true if user.superadmin?
    return true if user.admin? && user.groups.include?(record)
    false
  end

  def show?
    return true if user.superadmin?
    return true if (user.admin? || user.member?) && user.groups.include?(record)
    false
  end

  def add_user?
    update?
  end

  def remove_user?
    add_user?
  end
end
