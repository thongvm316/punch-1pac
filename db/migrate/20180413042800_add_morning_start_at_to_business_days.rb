# frozen_string_literal: true

class AddMorningStartAtToBusinessDays < ActiveRecord::Migration[5.1]
  def change
    add_column :business_days, :morning_started_at, :time, null: false, default: '00:00'
    add_column :business_days, :morning_ended_at, :time, null: false, default: '00:00'
    add_column :business_days, :afternoon_started_at, :time, null: false, default: '00:00'
    add_column :business_days, :afternoon_ended_at, :time, null: false, default: '00:00'
  end
end
