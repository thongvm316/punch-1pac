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
end
