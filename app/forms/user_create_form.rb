# frozen_string_literal: true

class UserCreateForm < BaseForm
  attribute :user, User
  attribute :current_company, Company
  attribute :current_user, User
  attribute :permission_ids, Array
  attribute :group_id, Integer

  STRONG_PARAMS = %w[name password password_confirmation email role].freeze
  STRONG_PARAMS.each { |attr| attribute attr }

  validate :validate_group
  # validate :validate_permissions

  def initialize(attrs, current_user)
    super attrs
    @current_user     = current_user
    @user             = current_user.company.users.build(user_params)
    @groups           = current_user.company.groups.where(id: group_id)
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

  # def validate_permissions
  #   errors.add(:permissions, I18n.t('errors.messages.invalid')) if @permissions.blank?
  # end
end
