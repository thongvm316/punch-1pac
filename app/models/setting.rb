# frozen_string_literal: true

# == Schema Information
#
# Table name: settings
#
#  id               :bigint(8)        not null, primary key
#  settingable_type :string
#  settingable_id   :bigint(8)
#  name             :integer          default("date_of_monthly_report"), not null
#  options          :json             not null
#  min_value        :integer          default(0)
#  max_value        :integer          default(0)
#  active           :boolean          default(FALSE), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_settings_on_settingable_type_and_settingable_id           (settingable_type,settingable_id)
#  index_settings_on_settingable_type_and_settingable_id_and_name  (settingable_type,settingable_id,name) UNIQUE
#

class Setting < ApplicationRecord
  enum name: { date_of_monthly_report: 0, maximum_hours_absences: 1 }

  belongs_to :settingable, polymorphic: true
end
