class CreateCustomHolidays < ActiveRecord::Migration[5.1]
  def change
    create_table :custom_holidays do |t|
      t.bigint :company_id, null: false
      t.date :started_at
      t.date :ended_at

      t.timestamps
    end
    add_index :custom_holidays, :company_id
  end
end
