class RemoveCourseIdFromAssignments < ActiveRecord::Migration
  def change
    remove_column :assignments, :course_id, :integer
  end
end
