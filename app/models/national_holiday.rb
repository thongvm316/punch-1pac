# frozen_string_literal: true

# == Schema Information
#
# Table name: national_holidays
#
#  id         :integer          not null, primary key
#  admin_id   :integer          not null
#  country    :string           not null
#  name       :string           not null
#  started_at :date             not null
#  ended_at   :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_national_holidays_on_admin_id  (admin_id)
#

class NationalHoliday < ApplicationRecord
  belongs_to :admin

  scope :selected_attr, -> { select(:id, :name, :started_at, :ended_at) }
  scope :in_holiday, ->(target_date) { where('? BETWEEN started_at AND ended_at', target_date) }
end
