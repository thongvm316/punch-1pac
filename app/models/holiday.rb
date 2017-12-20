# frozen_string_literal: true

# == Schema Information
#
# Table name: holidays
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
#  index_holidays_on_admin_id  (admin_id)
#

class Holiday < ApplicationRecord
  has_many :company_holidays, dependent: :destroy
  has_many :companies, through: :company_holidays

  scope :available_for_company, ->(company_id, ids) {
    Holiday.where(id: ids).where.not(id: CompanyHoliday.select(:holiday_id).where(company_id: company_id))
  }
  scope :selected_attr, -> { select(:id, :name, :started_at, :ended_at) }
  scope :in_holiday, ->(target_date) { where('? BETWEEN started_at AND ended_at', target_date) }
end
