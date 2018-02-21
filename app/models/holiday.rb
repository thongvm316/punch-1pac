# frozen_string_literal: true

# == Schema Information
#
# Table name: holidays
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  started_at :date             not null
#  ended_at   :date             not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_holidays_on_company_id  (company_id)
#

class Holiday < ApplicationRecord
  belongs_to :company

  validates :started_at, presence: true
  validates :ended_at, presence: true
  validates :name, presence: true

  validate :ended_at_and_started_at

  scope :selected_attr, -> { select(:id, :name, :started_at, :ended_at) }
  scope :in_holiday, ->(target_date) { where('? BETWEEN started_at AND ended_at', target_date) }
  scope :filter, ->(name) { where(name: name) }

  private

  def ended_at_and_started_at
    return if started_at.nil? || ended_at.nil?
    errors.add(:ended_at, I18n.t('errors.messages.greater_than', count: started_at)) if started_at > ended_at
  end
end
