# frozen_string_literal: true
# == Schema Information
#
# Table name: read_announcements
#
#  id              :integer          not null, primary key
#  announcement_id :integer          not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_read_announcements_on_announcement_id              (announcement_id)
#  index_read_announcements_on_announcement_id_and_user_id  (announcement_id,user_id) UNIQUE
#  index_read_announcements_on_user_id                      (user_id)
#


class ReadAnnouncement < ApplicationRecord
  belongs_to :announcement
  belongs_to :user
end
