class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.string :title
      t.datetime :due_date
      t.text :description
      t.boolean :homework
      t.boolean :classwork
      t.boolean :class_participation
      t.boolean :quiz
      t.boolean :test
      t.boolean :project
      t.boolean :miscellaneous
      t.boolean :reading
      t.integer :student_id
      t.integer :course_id

      t.timestamps null: false
    end
  end
end
