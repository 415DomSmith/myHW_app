class CreateCourseStudents < ActiveRecord::Migration
  def change
    create_table :course_students do |t|
      t.references :course, index: true, foreign_key: true
      t.references :student, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
