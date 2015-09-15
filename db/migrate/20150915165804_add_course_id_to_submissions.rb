class AddCourseIdToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :course_id, :integer
  end
end
