# frozen_string_literal: true

class CreateBusinessDays < ActiveRecord::Migration[5.1]
  def change
    create_table :business_days do |t|
      t.bigint :company_id, null: false
      t.time :started_at, null: false
      t.time :ended_at, null: false
      t.date :weekday, null: false

      t.timestamps null: false
    end

    add_index :business_days, :company_id
  end
end
