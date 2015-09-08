class CreateAssignmentCourses < ActiveRecord::Migration
  def change
    create_table :assignment_courses do |t|
      t.references :course, index: true, foreign_key: true
      t.references :assignment, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
