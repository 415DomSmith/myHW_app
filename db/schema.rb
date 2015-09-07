# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150907181646) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: :cascade do |t|
    t.string   "title"
    t.datetime "due_date"
    t.text     "description"
    t.boolean  "homework"
    t.boolean  "classwork"
    t.boolean  "class_participation"
    t.boolean  "quiz"
    t.boolean  "test"
    t.boolean  "project"
    t.boolean  "miscellaneous"
    t.boolean  "reading"
    t.integer  "student_id"
    t.integer  "course_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "course_students", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "course_students", ["course_id"], name: "index_course_students_on_course_id", using: :btree
  add_index "course_students", ["student_id"], name: "index_course_students_on_student_id", using: :btree

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.string   "subject"
    t.integer  "teacher_id"
    t.string   "school"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", force: :cascade do |t|
    t.string   "attach_file_name"
    t.integer  "attach_file_size"
    t.string   "attach_content_type"
    t.datetime "attach_updated_at"
    t.text     "google_drive_url"
    t.integer  "teacher_id"
    t.integer  "assignment_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "grade_students", force: :cascade do |t|
    t.integer  "grade_id"
    t.integer  "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "grade_students", ["grade_id"], name: "index_grade_students_on_grade_id", using: :btree
  add_index "grade_students", ["student_id"], name: "index_grade_students_on_student_id", using: :btree

  create_table "grades", force: :cascade do |t|
    t.integer  "total"
    t.integer  "score"
    t.integer  "assignment_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "students", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "is_teacher"
    t.string   "avatar"
    t.string   "school"
    t.string   "accesss_token"
    t.string   "refresh_token"
    t.integer  "expires_at"
    t.string   "google_id"
    t.boolean  "female"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "is_teacher"
    t.text     "avatar"
    t.string   "school"
    t.string   "access_token"
    t.string   "refresh_token"
    t.integer  "expires_at"
    t.string   "google_id"
    t.boolean  "female"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_foreign_key "course_students", "courses"
  add_foreign_key "course_students", "students"
  add_foreign_key "grade_students", "grades"
  add_foreign_key "grade_students", "students"
end
