class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.boolean :is_teacher
      t.text :avatar
      t.string :school
      t.string :access_token
      t.string :refresh_token
      t.integer :expires_at
      t.string :google_id
      t.boolean :female

      t.timestamps null: false
    end
  end
end
