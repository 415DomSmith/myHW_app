class CreateCourseSchools < ActiveRecord::Migration
  def change
    create_table :course_schools do |t|
      t.references :course, index: true, foreign_key: true
      t.references :school, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
