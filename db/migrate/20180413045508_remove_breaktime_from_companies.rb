# frozen_string_literal: true

class RemoveBreaktimeFromCompanies < ActiveRecord::Migration[5.1]
  def change
    remove_column :companies, :breaktime, :float
  end
end
