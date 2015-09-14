class DropTableAssignmentCourse < ActiveRecord::Migration
  def change
  	drop_table :assignment_courses
  end
end
