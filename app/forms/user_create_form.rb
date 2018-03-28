# frozen_string_literal: true

class UserCreateForm < BaseForm
  attribute :user, User
  attribute :permission_ids, Array
  attribute :group_id, Integer

  STRONG_PARAMS = %w[name password password_confirmation email role].freeze
  STRONG_PARAMS.each { |attr| attribute attr }

  validate :validate_group

  def initialize(attrs, current_user)
    super attrs
    @current_user = current_user
    @user         = current_user.company.users.build(user_params)
    @group        = current_user.company.groups.find_by(id: group_id)
  end

  def save
    return false unless valid?
    ApplicationRecord.transaction do
      @user.groups = [@group]
      @user.save!
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  def valid?
    super
    @user.valid?
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
    errors.add(:group, I18n.t('errors.messages.blank')) if @group.blank?
  end
end
