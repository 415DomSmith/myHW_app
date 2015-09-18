class AddAssignmentTitleToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :assignment_title, :string
  end
end
