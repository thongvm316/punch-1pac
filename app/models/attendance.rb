# frozen_string_literal: true

# == Schema Information
#
# Table name: attendances
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  day         :date             not null
#  attended_at :time
#  left_at     :time
#  status      :text             default(["\"absent\""]), not null, is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_attendances_on_user_id          (user_id)
#  index_attendances_on_user_id_and_day  (user_id,day) UNIQUE
#

class Attendance < ApplicationRecord
  belongs_to :user

  validates :day, presence: true
end
