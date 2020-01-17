# frozen_string_literal: true

class AddMonthlyReportToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :monthly_report, :integer, null: false, default: 1
  end
end
