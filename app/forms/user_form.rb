# frozen_string_literal: true

class UserForm < BaseForm
  attribute :user, User
  attribute :current_company, Company
  attribute :current_user, User
  attribute :department_id
  attribute :name
  attribute :password
  attribute :password_confirmation
  attribute :email
  attribute :role
  attribute :avatar
  attribute :permission_ids
  attribute :group_id

  validate :validate_group
  validate :validate_permissions

  def initialize(attrs, company, current_user, user = nil)
    super attrs
    @current_user     = current_user
    @current_company  = company
    @user             = user || current_company.users.build(user_params)
    @group            = verify_groups
    @permissions      = verify_permissions
    @user.assign_attributes(user_params) if @user.persisted?
  end

  def save
    return false unless valid?
    ApplicationRecord.transaction do
      @user.permissions = @permissions
      @user.groups = @groups if @groups.present?
      @user.save!
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  def valid?
    super
    errors.empty?
  end

  def error_messages
    valid?
    errors.messages.merge(@user.errors.messages)
  end

  private

  def verify_permissions
    if current_user.manager?
      Permission.where(id: permission_ids)
    else
      @user.permissions
    end
  end

  def verify_groups
    if current_user.manager?
      current_company.groups.where(id: group_id)
    else
      @user.groups
    end
  end

  def user_params
    user_params = %w[department_id name password password_confirmation email avatar]
    user_params << 'role' if current_user.manager?
    attributes.select { |k, v| user_params.include?(k.to_s) && v }
  end

  def validate_group
    errors.add(:group, I18n.t('errors.messages.invalid')) if @group.blank? && @current_user.manager?
  end

  def validate_permissions
    errors.add(:permissions, I18n.t('errors.messages.invalid')) if @permissions.blank? && @current_user.manager?
  end
end
