class CreateCourseUsers < ActiveRecord::Migration
  def change
    create_table :course_users do |t|
      t.references :course, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
