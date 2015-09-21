class AddColumnCourseIdToAnnouncements < ActiveRecord::Migration
  def change
    add_column :announcements, :course_id, :integer
  end
end
