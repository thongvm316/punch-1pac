# frozen_string_literal: true

class RemoveStartedAtFromBusinessDays < ActiveRecord::Migration[5.1]
  def change
    remove_column :business_days, :started_at, :time
    remove_column :business_days, :ended_at, :time
  end
end
