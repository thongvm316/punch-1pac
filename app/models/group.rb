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
  belongs_to :company
  has_many :group_permissions, dependent: :destroy
  has_many :permissions, through: :group_permissions
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  accepts_nested_attributes_for :group_permissions

  validates :name, presence: true
  validates :group_permissions, presence: true
end
