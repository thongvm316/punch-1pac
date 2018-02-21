# frozen_string_literal: true

class CreateHolidays < ActiveRecord::Migration[5.1]
  def change
    create_table :holidays do |t|
      t.bigint :company_id, null: false
      t.date :started_at, null: false
      t.date :ended_at, null: false
      t.string :name, null: false

      t.timestamps
    end
    add_index :holidays, :company_id
  end
end
