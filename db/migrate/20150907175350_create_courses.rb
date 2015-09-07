class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.string :subject
      t.integer :teacher_id
      t.string :school

      t.timestamps null: false
    end
  end
end
