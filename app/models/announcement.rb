# frozen_string_literal: true

# == Schema Information
#
# Table name: announcements
#
#  id         :integer          not null, primary key
#  admin_id   :integer          not null
#  target     :string           default("everyone"), not null
#  sent       :boolean          default(FALSE), not null
#  status     :string           default("normal"), not null
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
  validates :target, inclusion: { in: %w[everyone owners] }
  validates :status, inclusion: { in: %w[normal urgent] }

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
