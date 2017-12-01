# frozen_string_literal: true

class CreateDepartments < ActiveRecord::Migration[5.1]
  def change
    create_table :departments do |t|
      t.bigint :company_id, null: false
      t.string :name, null: false

      t.timestamps null: false
    end

    add_index :departments, :company_id
  end
end
