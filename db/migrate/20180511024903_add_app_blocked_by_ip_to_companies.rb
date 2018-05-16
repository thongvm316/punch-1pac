class AddAppBlockedByIpToCompanies < ActiveRecord::Migration[5.1]
  def change
    add_column :companies, :app_blocked_by_ip, :boolean, null: false, default: false
  end
end
