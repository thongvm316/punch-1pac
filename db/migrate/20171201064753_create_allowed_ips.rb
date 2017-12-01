# frozen_string_literal: true

class CreateAllowedIps < ActiveRecord::Migration[5.1]
  def change
    create_table :allowed_ips do |t|
      t.bigint :company_id, null: false
      t.inet :ip_address, null: false

      t.timestamps null: false
    end

    add_index :allowed_ips, :company_id
    add_index :allowed_ips, :ip_address
    add_index :allowed_ips, %i[company_id ip_address], unique: true
  end
end
