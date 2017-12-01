# frozen_string_literal: true

class CreateJwtBlacklist < ActiveRecord::Migration[5.1]
  def change
    create_table :jwt_blacklist do |t|
      t.string :jti, null: false
      t.datetime :exp, null: false

      t.timestamps null: false
    end

    add_index :jwt_blacklist, :jti, unique: true
  end
end
