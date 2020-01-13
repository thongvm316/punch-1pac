class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.belongs_to :settingable, polymorphic: true
      t.integer :name, null: false, default: 0
      t.json :options, null: false, default: {}
      t.integer :min_value, default: 0
      t.integer :max_value, default: 0
      t.boolean :active, null: false, default: false

      t.timestamps
    end

    add_index :settings, %i[settingable_type settingable_id name], unique: true
  end
end
