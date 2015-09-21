class AddCategoryToAssignments < ActiveRecord::Migration
  def change
    add_column :assignments, :category, :text
  end
end
