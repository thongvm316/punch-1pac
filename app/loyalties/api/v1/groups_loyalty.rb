# frozen_string_literal: true

class Api::V1::GroupsLoyalty < ApplicationLoyalty
  def add_user?
    return false if record[:user].member? && record[:user].groups.present?
    return true if user.superadmin?
    return true if user.admin? && user.groups.include?(record[:group])
    false
  end

  def remove_user?
    return true if user.superadmin?
    return true if user.admin? && user.groups.include?(record)
    false
  end
end
