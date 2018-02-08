# frozen_string_literal: true

class Api::V1::GroupsLoyalty < ApplicationLoyalty
  def add_user?
    return false if record[:user].role == 'member' && record[:user].groups.present?
    user.manager? && user.groups.include?(record[:group])
  end

  def remove_user?
    user.manager? && user.groups.include?(record)
  end
end
