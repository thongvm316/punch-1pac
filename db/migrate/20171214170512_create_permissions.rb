# frozen_string_literal: true

class CreatePermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :permissions, &:timestamps
  end
end
