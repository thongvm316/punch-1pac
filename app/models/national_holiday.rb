# frozen_string_literal: true

# == Schema Information
#
# Table name: national_holidays
#
#  id         :bigint(8)        not null, primary key
#  admin_id   :bigint(8)        not null
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
  COUNTRIES = %w[vietnam japan].freeze

  validates :country, presence: true, inclusion: { in: COUNTRIES }
  validates :name, presence: true
  validates :started_at, presence: true
  validates :ended_at, presence: true

  belongs_to :admin

  scope :selected_attr, -> { select('id as national_holiday_id', :name, :started_at, :ended_at) }
end
