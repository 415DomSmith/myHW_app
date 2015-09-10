class RemoveColumnSchoolIdFromCourse < ActiveRecord::Migration
  def change
    remove_column :courses, :school_id, :integer
    remove_column :courses, :school, :string
  end
end
