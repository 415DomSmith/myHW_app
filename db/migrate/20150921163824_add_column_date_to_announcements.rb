class AddColumnDateToAnnouncements < ActiveRecord::Migration
  def change
    add_column :announcements, :date, :datetime
  end
end
