# frozen_string_literal: true
# == Schema Information
#
# Table name: holidays
#
#  id                  :bigint(8)        not null, primary key
#  company_id          :bigint(8)        not null
#  started_at          :date             not null
#  ended_at            :date             not null
#  name                :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  national_holiday_id :bigint(8)
#
# Indexes
#
#  index_holidays_on_company_id                          (company_id)
#  index_holidays_on_company_id_and_national_holiday_id  (company_id,national_holiday_id) UNIQUE
#

class Holiday < ApplicationRecord
  belongs_to :company

  validates :started_at, presence: true
  validates :ended_at, presence: true
  validates :name, presence: true

  validate :ended_at_and_started_at

  scope :in_holiday, ->(target_date) { where('? BETWEEN started_at AND ended_at', target_date) }
  scope :filter, ->(params) {
    q = all
    q = q.where('name LIKE ?', "%#{name}%") if params[:name].present?
    q = q.where('extract(year from started_at) = ?', params[:year]) if params[:year].present?
    q
  }
  scope :national_holiday_ids, ->(company_id) { select(:national_holiday_id).where(company_id: company_id).where.not(national_holiday_id: nil) }

  def self.in_month(str_time)
    time = str_time ? Date.parse(str_time) : Date.current
    raise ArgumentError if time.blank?
    where("date_trunc('month', started_at) = ? OR date_trunc('month', ended_at) = ?", time.beginning_of_month, time.beginning_of_month)
  rescue TypeError, ArgumentError
    none
  end

  private

  def ended_at_and_started_at
    return if started_at.nil? || ended_at.nil?
    errors.add(:ended_at, :greater_than, count: started_at) if started_at > ended_at
  end
end
