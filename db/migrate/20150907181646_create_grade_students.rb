class CreateGradeStudents < ActiveRecord::Migration
  def change
    create_table :grade_students do |t|
      t.references :grade, index: true, foreign_key: true
      t.references :student, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
