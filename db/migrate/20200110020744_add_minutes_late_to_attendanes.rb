# frozen_string_literal: true

class AddMinutesLateToAttendanes < ActiveRecord::Migration[5.1]
  def change
    add_column :attendances, :minutes_attend_late, :integer, null: false, default: 0
    add_column :attendances, :minutes_leave_early, :integer, null: false, default: 0
  end
end
