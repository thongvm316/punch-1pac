# frozen_string_literal: true

class AddPunchMethodToCompany < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :punch_method, :integer, null: false, default: 0
  end
end
