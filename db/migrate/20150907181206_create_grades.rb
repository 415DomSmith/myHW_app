class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.integer :total
      t.integer :score
      t.integer :assignment_id

      t.timestamps null: false
    end
  end
end
