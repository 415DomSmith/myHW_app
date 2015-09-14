class AddColumnDescriptionToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :description, :text
    add_column :documents, :google_drive_Id, :string
    add_column :documents, :file_type, :string
    add_column :documents, :google_doc_name, :string
    add_column :documents, :drive_parent_id, :string
    add_column :documents, :isDriveDoc, :boolean
  end
end
