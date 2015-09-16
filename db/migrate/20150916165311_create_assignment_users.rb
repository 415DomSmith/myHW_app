class CreateAssignmentUsers < ActiveRecord::Migration
  def change
    create_table :assignment_users do |t|
      t.references :assignment, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
