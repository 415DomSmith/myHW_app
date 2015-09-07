class CreateAssignmentStudents < ActiveRecord::Migration
  def change
    create_table :assignment_students do |t|
      t.references :student, index: true, foreign_key: true
      t.references :assignment, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
