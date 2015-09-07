class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :attach_file_name
      t.integer :attach_file_size
      t.string :attach_content_type
      t.datetime :attach_updated_at
      t.text :google_drive_url
      t.integer :teacher_id
      t.integer :assignment_id

      t.timestamps null: false
    end
  end
end
