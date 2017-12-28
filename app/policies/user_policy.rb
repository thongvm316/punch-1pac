# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    @user.manager?
  end

  def show?
    @user.manager? || @user == @record
  end

  def create?
    @user.manager?
  end

  def create_multi?
    @user.manager?
  end

  def destroy?
    return true if higher_role?
    false
  end

  def update?
    return true if higher_role?
    return true if @user == @record
    false
  end

  def permitted_attributes
    if @user.manager?
      [:department_id, :name, :password, :password_confirmation, :email,
       :role, user_permissions_attributes: [:permission_id]]
    else
      %i[department_id name password password_confirmation email]
    end
  end

  private

  def higher_role?
    return true if @user.superadmin? && !@record.superadmin?
    return true if @user.admin? && @record.member?
  end
end
