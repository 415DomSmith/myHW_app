class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :max
      t.integer :score
      t.integer :assignment_id
      t.text :answer
      t.text :submission_link

      t.timestamps null: false
    end
  end
end
