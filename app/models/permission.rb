# frozen_string_literal: true

# == Schema Information
#
# Table name: permissions
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  action     :string           not null
#  controller :string           not null
#  role       :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Permission < ApplicationRecord
  has_many :group_permissions, dependent: :destroy
  has_many :groups, through: :group_permissions
  has_many :user_permissions, dependent: :destroy
  has_many :users, through: :user_permissions
  validates :role, presence: true
  validates :name, presence: true
  validates :action, presence: true
  validates :controller, presence: true

  scope :filter, ->(params) {
    query = all
    query = query.where(role: params[:role]) if params[:role].present?
    query
  }

  def self.of_member
    where(role: User.roles[:member])
  end
end
