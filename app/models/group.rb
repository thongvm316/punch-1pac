# frozen_string_literal: true

# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Group < ApplicationRecord
  has_many :group_permissions, dependent: :destroy
  has_many :permissions, through: :group_permissions
  belongs_to :company

  validates :name, presence: true

  def create_with_permission(permission_ids)
    return false unless valid_permission?(permission_ids)
    ActiveRecord::Base.transaction do
      save!
      group_permissions = permission_ids.map do |permission_id|
        { group_id: id, permission_id: permission_id }
      end
      GroupPermission.import!(group_permissions)
    end

    true
  rescue StandardError => _
    false
  end

  private

  def valid_permission?(permission_ids)
    if permission_ids.empty?
      errors.add(:permission, I18n.t('errors.messages.permission.can_not_empty'))
      false
    else
      true
    end
  end
end
