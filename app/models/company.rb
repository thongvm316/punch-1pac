# frozen_string_literal: true

# == Schema Information
#
# Table name: companies
#
#  id           :integer          not null, primary key
#  namespace    :string           not null
#  name         :string           not null
#  country      :string           not null
#  industry     :string           not null
#  address      :string           not null
#  phone_number :string           not null
#  postal_code  :string
#  tax_code     :string
#  activated    :boolean          default(TRUE), not null
#  timezone     :string           default("Asia/Hanoi"), not null
#  breaktime    :float            default(1.0), not null
#  breakdays    :string           default([]), not null, is an Array
#  logo_data    :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_companies_on_namespace  (namespace) UNIQUE
#

class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :allowed_ips, dependent: :destroy
  has_many :business_days, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :company_holidays, dependent: :destroy
  has_many :holidays, through: :company_holidays
  has_many :custom_holidays, dependent: :destroy
  has_many :groups, dependent: :destroy

  validates :namespace, presence: true, uniqueness: true
  validates :name, presence: true
  validates :country, presence: true
  validates :industry, presence: true
  validates :address, presence: true
  validates :phone_number, presence: true
  validates :timezone, inclusion: { in: ActiveSupport::TimeZone.all.map { |tz| tz.tzinfo.name } }

  include ImageUploader::Attachment.new(:logo)

  def in_holiday(target_date)
    return true if custom_holidays.in_holiday(target_date).exists?
    return true if holidays.in_holiday(target_date).exists?
    false
  end
end
