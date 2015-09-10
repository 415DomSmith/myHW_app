class AddColumnSchoolIdToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :school_id, :integer
  end
end
