# frozen_string_literal: true

class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.bigint :company_id, null: false
      t.string :name, null: false
      t.timestamps
    end
  end
end
