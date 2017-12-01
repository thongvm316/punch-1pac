# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.bigint :company_id, null: false
      t.bigint :department_id, null: false
      t.string :role, null: false, default: 'normal'
      t.string :name, null: false
      t.string :gender, null: false, default: 'male'
      t.text :avatar_data
      t.string :language, null: false, default: 'en'
    end

    add_index :users, :company_id
    add_index :users, :department_id
  end
end
