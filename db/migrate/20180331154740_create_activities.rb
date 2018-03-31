# frozen_string_literal: true

class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.bigint :user_id, null: false
      t.bigint :activitable_id, null: false
      t.string :activitable_type, null: false
      t.string :kind, null: false

      t.timestamps null: false
    end

    add_index :activities, :user_id
    add_index :activities, %w[activitable_id activitable_type]
  end
end
