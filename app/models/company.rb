# frozen_string_literal: true
# == Schema Information
#
# Table name: companies
#
#  id           :integer          not null, primary key
#  owner_id     :integer          not null
#  namespace    :string           not null
#  name         :string           not null
#  country      :string           not null
#  industry     :string           not null
#  address      :string           not null
#  phone_number :string           not null
#  postal_code  :string
#  tax_code     :string
#  activated    :boolean          default(TRUE), not null
#  timezone     :string           default("Hanoi"), not null
#  breaktime    :float            default(1.0), not null
#  breakdays    :string           default([]), not null, is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_companies_on_namespace  (namespace) UNIQUE
#


class Company < ApplicationRecord
  belongs_to :owner, class: User, foreign_key: :owner_id
  has_many :users
  has_many :allowed_ips
  has_many :business_days
  has_many :company_holidays
  has_many :holidays, through: :company_holidays

  validates :namespace, presence: true, uniqueness: true
  validates :name, presence: true
  validates :county, presence: true
  validates :industry, presence: true
  validates :address, presence: true
  validates :phone_number, presence: true
end
