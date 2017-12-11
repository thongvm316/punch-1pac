# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.bigint   :company_id, null: false
      t.bigint   :department_id
      t.string   :email, null: false
      t.string   :password_digest, null: false
      t.string   :role, null: false, default: 'normal'
      t.boolean  :owner, null: false, default: false
      t.string   :name, null: false
      t.string   :gender, null: false, default: 'male'
      t.text     :avatar_data
      t.string   :language, null: false, default: 'en'
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      t.timestamps null: false
    end

    add_index :users, :company_id
    add_index :users, :department_id
    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
