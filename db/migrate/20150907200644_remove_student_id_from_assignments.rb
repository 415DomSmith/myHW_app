class RemoveStudentIdFromAssignments < ActiveRecord::Migration
  def change
    remove_column :assignments, :student_id, :integer
  end
end
