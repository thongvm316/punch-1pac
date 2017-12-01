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
  belongs_to :admin
  has_many :company_holidays, dependent: :destroy
  has_many :companies, through: :company_holidays

  validates :country, presence: true
  validates :name, presence: true
  validates :started_at, presence: true
  validates :ended_at, presence: true
end
