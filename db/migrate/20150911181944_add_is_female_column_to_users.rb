class AddIsFemaleColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :isFemale, :boolean
  end
end
