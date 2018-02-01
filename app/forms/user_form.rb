# frozen_string_literal: true

class UserForm < BaseForm
  CREATE_PARAMS = %w[department_id name password password_confirmation email role avatar user_permissions_attributes].freeze

  MEMBER_UPDATE_PARAM = %w[department_id name password password_confirmation email avatar].freeze

  attribute :user, User
  attribute :current_company, Company
  attribute :current_user, User

  validate :validate_group
  validate :validate_permissions

  def initialize(attrs, params, user = nil)
    super attrs
    @params         = params
    @group          = current_company.groups.find_by(id: params[:group_id])
    @permission_ids = Permission.verify(params[:permission_ids])
    @user           = user || current_company.users.build(user_params)
  end

  def save
    return false unless valid?
    if @user.save
      true
    else
      false
    end
  end

  def update
    @current_user.manager? ? update_with_manager : update_with_member
  end

  def update_with_manager
    return false unless valid?
    ApplicationRecord.transaction do
      @user.user_permissions.destroy_all if @current_user.manager?
      @user.update_attributes!(user_params)
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  def update_with_member
    user_params = @params.select { |k, v| MEMBER_UPDATE_PARAM.include?(k.to_s) && v }
    @user.update(user_params)
  end

  def valid?
    super
    errors.empty?
  end

  def error_messages
    valid?
    @user.present? ? errors.messages.merge(@user.errors.messages) : errors.messages
  end

  private

  def user_params
    @params[:user_permissions_attributes] = @permission_ids
    @params.select { |k, v| CREATE_PARAMS.include?(k.to_s) && v }
  end

  def validate_group
    errors.add(:group, I18n.t('errors.messages.invalid')) if @group.blank?
  end

  def validate_permissions
    errors.add(:permissions, I18n.t('errors.messages.invalid')) if @permission_ids.blank?
  end
end
