# frozen_string_literal: true

# == Schema Information
#
# Table name: business_days
#
#  id                   :integer          not null, primary key
#  company_id           :integer          not null
#  weekday              :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  morning_started_at   :time             default(Sat, 01 Jan 2000 00:00:00 UTC +00:00), not null
#  morning_ended_at     :time             default(Sat, 01 Jan 2000 00:00:00 UTC +00:00), not null
#  afternoon_started_at :time             default(Sat, 01 Jan 2000 00:00:00 UTC +00:00), not null
#  afternoon_ended_at   :time             default(Sat, 01 Jan 2000 00:00:00 UTC +00:00), not null
#
# Indexes
#
#  index_business_days_on_company_id  (company_id)
#

class BusinessDay < ApplicationRecord
  WEEKDAYS = %w[monday tuesday wednesday thursday friday saturday sunday].freeze

  belongs_to :company

  validate :morning_started_cannot_be_greater_than_morning_ended
  validate :afternoon_started_cannot_be_greater_than_afternoon_ended
  validates :weekday, presence: true, inclusion: { in: WEEKDAYS }
  validates :morning_started_at, presence: true
  validates :morning_ended_at, presence: true
  validates :afternoon_started_at, presence: true
  validates :afternoon_ended_at, presence: true

  private

  def morning_started_cannot_be_greater_than_morning_ended
    errors.add(:morning_started_at, :less_than, count: morning_ended_at.strftime('%H:%M')) if morning_started_at.to_i > morning_ended_at.to_i
  end

  def afternoon_started_cannot_be_greater_than_afternoon_ended
    errors.add(:afternoon_started_at, :less_than, count: afternoon_ended_at.strftime('%H:%M')) if afternoon_started_at.to_i > afternoon_ended_at.to_i
  end
end
