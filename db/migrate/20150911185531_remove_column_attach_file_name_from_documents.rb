class RemoveColumnAttachFileNameFromDocuments < ActiveRecord::Migration
  def change
    remove_column :documents, :attach_file_name, :string
    remove_column :documents, :attach_file_size, :integer
    remove_column :documents, :attach_content_type, :string
    remove_column :documents, :attach_updated_at, :datetime
    
  end
end
