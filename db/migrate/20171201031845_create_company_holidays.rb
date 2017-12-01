# frozen_string_literal: true

class CreateCompanyHolidays < ActiveRecord::Migration[5.1]
  def change
    create_table :company_holidays do |t|
      t.bigint :company_id, null: false
      t.bigint :holiday_id, null: false

      t.timestamps null: false
    end

    add_index :company_holidays, :company_id
    add_index :company_holidays, :holiday_id
    add_index :company_holidays, %i[company_id holiday_id], unique: true
  end
end
