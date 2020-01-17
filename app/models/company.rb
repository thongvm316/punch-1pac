# frozen_string_literal: true

# == Schema Information
#
# Table name: companies
#
#  id                :bigint(8)        not null, primary key
#  namespace         :string           not null
#  name              :string           not null
#  country           :string           not null
#  industry          :string           not null
#  address           :string           not null
#  phone_number      :string           not null
#  postal_code       :string
#  tax_code          :string
#  activated         :boolean          default(TRUE), not null
#  timezone          :string           default("Asia/Hanoi"), not null
#  logo_data         :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  app_blocked_by_ip :boolean          default(FALSE), not null
#  punch_method      :integer          default("default"), not null
#  monthly_report    :integer          default(1), not null
#
# Indexes
#
#  index_companies_on_namespace  (namespace) UNIQUE
#

class Company < ApplicationRecord
  INDUSTRIES = %w[hr_agency cafe_shop restaurant software_company startup interior_design].freeze
  TIMEZONES = ActiveSupport::TimeZone.all.map { |tz| tz.tzinfo.name }.uniq

  enum punch_method: { default: 0, qrcode_scan: 1 }

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

  def total_working_hours_on_month(params)
    weekdays = weekdays_in_month(params)

    business_days.reduce(0) do |total, business_day|
      working_hours_of_day = (business_day.morning_ended_at.to_i - business_day.morning_started_at.to_i) + (business_day.afternoon_ended_at.to_i - business_day.afternoon_started_at.to_i)
      total + (working_hours_of_day * weekdays[business_day.weekday]) / 3600
    end
  end

  def total_working_days_in_month(params)
    weekdays = weekdays_in_month(params)
    business_days.reduce(0) { |total, business_day| total + weekdays[business_day.weekday] }
  end

  def breakdays
    BusinessDay::WEEKDAYS - business_days.pluck(:weekday)
  end

  private

  def weekdays_in_month(params)
    wdays = weekdays

    from_date = Date.parse(params[:from_date])
    to_date   = Date.parse(params[:to_date])

    hdays = holidays.range_time(from_date, to_date)

    (from_date..to_date).to_a.each do |day|
      next if hdays.find { |holiday| day.between?(holiday.started_at, holiday.ended_at) }
      weekday = day.strftime('%A').downcase

      wdays[weekday] += 1
    end

    wdays
  rescue TypeError, ArgumentError
    wdays
  end

  def date_range(now, date_type)
    {
      start_at: date_type == 'year' ? now.beginning_of_year : now.beginning_of_month,
      end_at: date_type == 'year' ? now.end_of_year : now.end_of_month
    }
  end

  def weekdays
    BusinessDay::WEEKDAYS.each_with_object({}) { |weekday, o| o[weekday.to_s] = 0 }
  end
end
