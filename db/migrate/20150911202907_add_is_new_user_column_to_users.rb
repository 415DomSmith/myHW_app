class AddIsNewUserColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :isNewUser, :boolean, :default => true
  end
end
