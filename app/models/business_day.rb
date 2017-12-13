# frozen_string_literal: true

# == Schema Information
#
# Table name: business_days
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  started_at :time             not null
#  ended_at   :time             not null
#  weekday    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_business_days_on_company_id  (company_id)
#

class BusinessDay < ApplicationRecord
  belongs_to :company

  validates :started_at, presence: true
  validates :ended_at, presence: true
  validates :weekday, presence: true, inclusion: { in: %w[monday tuesday wednesday thursday friday saturday sunday] }
end
