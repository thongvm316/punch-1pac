# frozen_string_literal: true

# == Schema Information
#
# Table name: announcements
#
#  id         :integer          not null, primary key
#  admin_id   :integer          not null
#  target     :integer          default("everyone"), not null
#  sent       :boolean          default(FALSE), not null
#  status     :integer          default("normal"), not null
#  title      :string           not null
#  content    :string(2000)     not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_announcements_on_admin_id  (admin_id)
#

class Announcement < ApplicationRecord
  enum target: { everyone: 0, owners: 1 }
  enum status: { normal: 0, urgent: 1 }

  validates :title, presence: true
  validates :content, presence: true

  default_scope -> { order(id: :desc) }

  scope :for_all, ->() { where(target: %w[everyone owners]) }
  scope :for_everyone, ->() { where(target: 'everyone') }
  scope :unread, ->(user_id) { where.not(id: ReadAnnouncement.select(:announcement_id).where(user_id: user_id)) }

  def self.for_user(user)
    if user.owner?
      Announcement.for_all
    else
      Announcement.for_everyone
    end
  end
end
