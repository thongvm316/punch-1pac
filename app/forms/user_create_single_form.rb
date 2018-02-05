# frozen_string_literal: true

class UserCreateSingleForm < BaseForm
  attribute :user, User
  attribute :current_company, Company
  attribute :current_user, User
  STRONG_PARAMS = %w[department_id name password password_confirmation email avatar role].freeze
  USER_ATTRIBUTES = STRONG_PARAMS | %w[permission_ids group_ids].freeze
  USER_ATTRIBUTES.each { |attr| attribute attr }

  validate :validate_group
  validate :validate_permissions

  def initialize(attrs, company, current_user)
    super attrs
    @current_user     = current_user
    @current_company  = company
    @user             = current_company.users.build(user_params)
    @groups           = current_company.groups.where(id: group_ids)
    @permissions      = Permission.where(id: permission_ids)
  end

  def save
    return false unless valid?
    ApplicationRecord.transaction do
      @user.permissions = @permissions
      @user.groups = @groups
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

  def user_params
    attributes.select { |k, v| STRONG_PARAMS.include?(k.to_s) && v }
  end

  def validate_group
    errors.add(:group, I18n.t('errors.messages.invalid')) if @groups.blank?
  end

  def validate_permissions
    errors.add(:permissions, I18n.t('errors.messages.invalid')) if @permissions.blank?
  end
end
