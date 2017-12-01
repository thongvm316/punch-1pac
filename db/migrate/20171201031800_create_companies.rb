# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :namespace, null: false
      t.string :name, null: false
      t.string :country, null: false
      t.string :industry, null: false
      t.string :address, null: false
      t.string :phone_number, null: false
      t.string :postal_code
      t.string :tax_code
      t.boolean :activated, null: false, default: true
      t.string :timezone, null: false, default: 'Hanoi'
      t.float :breaktime, null: false, default: 1
      t.string :breakdays, null: false, array: true, default: []

      t.timestamps null: false
    end

    add_index :companies, :namespace, unique: true
  end
end
