class Create1000Users < ActiveRecord::Migration[5.1]
  def change
    FactoryBot.create_list(:user, 1000 , company: Company.first)
  end
end
