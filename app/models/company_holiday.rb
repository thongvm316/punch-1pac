# frozen_string_literal: true
# == Schema Information
#
# Table name: company_holidays
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  holiday_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_company_holidays_on_company_id                 (company_id)
#  index_company_holidays_on_company_id_and_holiday_id  (company_id,holiday_id) UNIQUE
#  index_company_holidays_on_holiday_id                 (holiday_id)
#


class CompanyHoliday < ApplicationRecord
end
