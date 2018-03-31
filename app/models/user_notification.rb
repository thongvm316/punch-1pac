# frozen_string_literal: true

# == Schema Information
#
# Table name: user_notifications
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  activity_id :integer          not null
#  read        :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_user_notifications_on_user_id                  (user_id)
#  index_user_notifications_on_user_id_and_activity_id  (user_id,activity_id) UNIQUE
#

class UserNotification < ApplicationRecord
  belongs_to :user
  belongs_to :activity
end
