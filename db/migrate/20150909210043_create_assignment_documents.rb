class CreateAssignmentDocuments < ActiveRecord::Migration
  def change
    create_table :assignment_documents do |t|
      t.references :assignment, index: true, foreign_key: true
      t.references :document, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
