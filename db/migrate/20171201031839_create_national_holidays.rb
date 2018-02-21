# frozen_string_literal: true

class CreateNationalHolidays < ActiveRecord::Migration[5.1]
  def change
    create_table :national_holidays do |t|
      t.bigint :admin_id, null: false
      t.string :country, null: false
      t.string :name, null: false
      t.date :started_at, null: false
      t.date :ended_at, null: false

      t.timestamps null: false
    end

    add_index :national_holidays, :admin_id
  end
end
