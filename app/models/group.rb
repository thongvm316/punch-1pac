# frozen_string_literal: true

# == Schema Information
#
# Table name: groups
#
#  id          :bigint(8)        not null, primary key
#  company_id  :bigint(8)        not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#  image_data  :text
#

class Group < ApplicationRecord
  include Settingable

  DEFAULT_NAME = 'default'

  belongs_to :company
  has_many :group_permissions, dependent: :destroy
  has_many :permissions, through: :group_permissions
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  validates :name, presence: true

  include ImageUploader::Attachment.new(:image)

  scope :pending_requests, -> {
    select('COUNT(*) as num_pending_request', :id, :name)
      .joins(:users).merge(User.pending_requests)
      .group(:id)
  }

  def self.for_user(user)
    if %w[member admin].include?(user.role)
      where(id: UserGroup.select(:group_id).where(user: user))
    else
      all
    end
  end
end
