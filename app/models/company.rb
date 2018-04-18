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
#  logo_data    :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_companies_on_namespace  (namespace) UNIQUE
#

class Company < ApplicationRecord
  INDUSTRIES = %w[hr_agency cafe_shop restaurant software_company startup].freeze
  TIMEZONES = ActiveSupport::TimeZone.all.map { |tz| tz.tzinfo.name }.uniq

  has_many :users, dependent: :destroy
  has_many :allowed_ips, dependent: :destroy
  has_many :business_days, dependent: :destroy
  has_many :holidays, dependent: :destroy
  has_many :groups, dependent: :destroy

  validates :namespace, presence: true, uniqueness: true
  validates :name, presence: true
  validates :country, presence: true
  validates :industry, presence: true, inclusion: { in: INDUSTRIES }
  validates :address, presence: true
  validates :phone_number, presence: true
  validates :timezone, inclusion: { in: TIMEZONES }

  include ImageUploader::Attachment.new(:logo)

  accepts_nested_attributes_for :groups, allow_destroy: true

  def in_holiday(target_date)
    holidays.in_holiday(target_date).exists?
  end
end
