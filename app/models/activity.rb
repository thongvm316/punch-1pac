# frozen_string_literal: true

# == Schema Information
#
# Table name: activities
#
#  id               :bigint(8)        not null, primary key
#  user_id          :bigint(8)        not null
#  activitable_id   :bigint(8)        not null
#  activitable_type :string           not null
#  kind             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_activities_on_activitable_id_and_activitable_type  (activitable_id,activitable_type)
#  index_activities_on_user_id                              (user_id)
#

class Activity < ApplicationRecord
  ACTION_KINDS = {
    request: %w[create update approve reject],
    attendance: %w[punch_in punch_out]
  }.freeze

  belongs_to :user
  belongs_to :activitable, polymorphic: true
  has_many :user_notifications, dependent: :destroy

  validates :kind, presence: true, inclusion: { in: ACTION_KINDS.values.flatten.uniq }

  default_scope -> { order(updated_at: :desc) }
  scope :unread_count, ->(last_read_noti_id) { where('activities.id > ?', last_read_noti_id).count }

  def self.track(current_user, activitable, kind)
    activity = new(user: current_user, activitable: activitable, kind: kind)
    ApplicationRecord.transaction do
      activity.save!
      UserNotification.import(user_notifications(current_user, activity, activitable, kind))
    end
  end

  def self.user_notifications(current_user, activity, activitable, kind)
    notified_users = if activitable.is_a?(Request) && %w[approve reject].include?(kind)
                       [activitable.user].reject { |user| user == current_user }
                     elsif activitable.is_a?(Request) && %w[create update].include?(kind)
                       User.where(id: UserGroup.with_group(current_user.groups)).where.not(role: :member, id: current_user.id)
                     else
                       []
                     end
    notified_users.map { |user| UserNotification.new(user: user, activity: activity) }
  end
end
