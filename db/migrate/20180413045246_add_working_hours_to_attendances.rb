# frozen_string_literal: true

class AddWorkingHoursToAttendances < ActiveRecord::Migration[5.1]
  def change
    add_column :attendances, :working_hours, :integer, null: false, default: 0
  end
end
