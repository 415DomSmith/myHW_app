class AddTeacherIdToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :teacherId, :integer
  end
end
