class AddIframeToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :iframe, :string
  end
end
