class CreateSubmissionUsers < ActiveRecord::Migration
  def change
    create_table :submission_users do |t|
      t.references :submission, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
