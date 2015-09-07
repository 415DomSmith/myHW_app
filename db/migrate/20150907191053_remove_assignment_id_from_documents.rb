class RemoveAssignmentIdFromDocuments < ActiveRecord::Migration
  def change
    remove_column :documents, :assignment_id, :integer
  end
end
