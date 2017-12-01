# frozen_string_literal: true

# == Schema Information
#
# Table name: announcements
#
#  id          :integer          not null, primary key
#  admin_id    :integer          not null
#  send_type   :string           default("all"), not null
#  send_status :string           default("sending"), not null
#  status      :string           default("normal"), not null
#  title       :string           not null
#  content     :string(2000)     not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_announcements_on_admin_id  (admin_id)
#

class Announcement < ApplicationRecord
  extend Enumerize

  enumerize :send_type, in: %i[all owners]
  enumerize :send_status, in: %i[sending sent]
  enumerize :status, in: %i[normal urgent]
end
