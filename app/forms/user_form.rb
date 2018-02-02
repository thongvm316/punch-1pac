# frozen_string_literal: true

class UserForm < BaseForm
  attribute :user, User
  attribute :current_company, Company
  attribute :current_user, User
  attribute :params

  validate :validate_group
  validate :validate_permissions

  def initialize(attrs, user = nil)
    super attrs
    @group          = current_company.groups.find_by(id: params[:group_id]) if params[:group_id].present?
    @permission_ids = Permission.verify(params[:permission_ids]) if params[:permission_ids].present?

    @user           = user || current_company.users.build(user_params)
  end

  def save
    return false unless valid? if @current_user.manager?
    ApplicationRecord.transaction do
      @user.user_permissions.destroy_all if @current_user.manager? && @user.persisted?
      @user.assign_attributes(user_params) if @user.persisted?
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
    user_params = if current_user.manager?
               @params[:user_permissions_attributes] = @permission_ids
               %w[department_id name password password_confirmation email role avatar user_permissions_attributes].freeze
             else
               %w[department_id name password password_confirmation email avatar].freeze
             end
    @params.select { |k, v| user_params.include?(k.to_s) && v }
  end

  def validate_group
    errors.add(:group, I18n.t('errors.messages.invalid')) if @group.blank? && @current_user.manager?
  end

  def validate_permissions
    errors.add(:permissions, I18n.t('errors.messages.invalid')) if @permission_ids.blank? && @current_user.manager?
  end
end
