# == Schema Information
#
# Table name: custom_holidays
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  started_at :date
#  ended_at   :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_custom_holidays_on_company_id  (company_id)
#

class CustomHoliday < ApplicationRecord
  belongs_to :company
end
