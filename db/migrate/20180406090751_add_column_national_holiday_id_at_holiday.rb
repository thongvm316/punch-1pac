# frozen_string_literal: true

class AddColumnNationalHolidayIdAtHoliday < ActiveRecord::Migration[5.1]
  def change
    add_column :holidays, :national_holiday_id, :bigint

    add_index :holidays, %i[company_id national_holiday_id], unique: true
  end
end
