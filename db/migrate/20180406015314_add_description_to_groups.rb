# frozen_string_literal: true

class AddDescriptionToGroups < ActiveRecord::Migration[5.1]
  change_table :groups, bulk: true do
    add_column :groups, :description, :string
    add_column :groups, :image_data, :text
  end
end
