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

ActiveRecord::Schema.define(version: 20150909210901) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignment_courses", force: :cascade do |t|
    t.integer  "assignment_id"
    t.integer  "course_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "assignment_courses", ["assignment_id"], name: "index_assignment_courses_on_assignment_id", using: :btree
  add_index "assignment_courses", ["course_id"], name: "index_assignment_courses_on_course_id", using: :btree

  create_table "assignment_documents", force: :cascade do |t|
    t.integer  "assignment_id"
    t.integer  "document_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "assignment_documents", ["assignment_id"], name: "index_assignment_documents_on_assignment_id", using: :btree
  add_index "assignment_documents", ["document_id"], name: "index_assignment_documents_on_document_id", using: :btree

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
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.string   "subject"
    t.string   "school"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", force: :cascade do |t|
    t.string   "attach_file_name"
    t.integer  "attach_file_size"
    t.string   "attach_content_type"
    t.datetime "attach_updated_at"
    t.text     "google_drive_url"
    t.integer  "user_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "submissions", force: :cascade do |t|
    t.integer  "max"
    t.integer  "score"
    t.integer  "assignment_id"
    t.text     "answer"
    t.text     "submission_link"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "assignment_courses", "assignments"
  add_foreign_key "assignment_courses", "courses"
  add_foreign_key "assignment_documents", "assignments"
  add_foreign_key "assignment_documents", "documents"
end
