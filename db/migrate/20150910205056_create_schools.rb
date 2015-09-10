class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :name
      t.string :city
      t.string :image
      t.string :mascot

      t.timestamps null: false
    end
  end
end
