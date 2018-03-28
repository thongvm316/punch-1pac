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
#  content    :string(500)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  due_date   :date             not null
#
# Indexes
#
#  index_announcements_on_admin_id  (admin_id)
#

class Announcement < ApplicationRecord
  enum target: { everyone: 0, owners: 1 }
  enum status: { normal: 0, urgent: 1 }

  validates :due_date, presence: true
  validates :content, presence: true

  belongs_to :admin

  default_scope -> { where('? < due_date', Date.current).order(updated_at: :desc) }

  scope :unread, ->(user_id) { where.not(id: ReadAnnouncement.select(:announcement_id).where(user_id: user_id)) }
  scope :read, ->(user_id) { where(id: ReadAnnouncement.select(:announcement_id).where(user_id: user_id)) }

  scope :search_by, ->(params, user_id) {
    q = all
    if params[:read_status].present?
      q = q.read(user_id)   if params[:read_status] == 'read'
      q = q.unread(user_id) if params[:read_status] == 'unread'
    end
    q
  }

  def self.for_user(user)
    if user.owner?
      where(target: %w[everyone owners])
    else
      where(target: 'everyone')
    end
  end
end
