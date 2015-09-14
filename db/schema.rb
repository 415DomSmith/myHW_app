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

ActiveRecord::Schema.define(version: 20150914221646) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer  "course_id"
  end

  create_table "course_schools", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "course_schools", ["course_id"], name: "index_course_schools_on_course_id", using: :btree
  add_index "course_schools", ["school_id"], name: "index_course_schools_on_school_id", using: :btree

  create_table "course_users", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "course_users", ["course_id"], name: "index_course_users_on_course_id", using: :btree
  add_index "course_users", ["user_id"], name: "index_course_users_on_user_id", using: :btree

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.string   "subject"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "teacherId"
  end

  create_table "documents", force: :cascade do |t|
    t.text     "google_drive_url"
    t.integer  "user_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "attachment_file_name"
    t.string   "attachment_content_type"
    t.integer  "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.text     "description"
    t.string   "google_drive_Id"
    t.string   "file_type"
    t.string   "google_doc_name"
    t.string   "drive_parent_id"
    t.boolean  "isDriveDoc"
  end

  create_table "school_users", force: :cascade do |t|
    t.integer  "school_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "school_users", ["school_id"], name: "index_school_users_on_school_id", using: :btree
  add_index "school_users", ["user_id"], name: "index_school_users_on_user_id", using: :btree

  create_table "schools", force: :cascade do |t|
    t.string   "name"
    t.string   "city"
    t.string   "image"
    t.string   "mascot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "submission_users", force: :cascade do |t|
    t.integer  "submission_id"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "submission_users", ["submission_id"], name: "index_submission_users_on_submission_id", using: :btree
  add_index "submission_users", ["user_id"], name: "index_submission_users_on_user_id", using: :btree

  create_table "submissions", force: :cascade do |t|
    t.integer  "max"
    t.integer  "score"
    t.integer  "assignment_id"
    t.text     "answer"
    t.text     "submission_link"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.boolean  "isTeacher",              default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "isFemale"
    t.boolean  "isNewUser",              default: true
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  add_foreign_key "assignment_documents", "assignments"
  add_foreign_key "assignment_documents", "documents"
  add_foreign_key "course_schools", "courses"
  add_foreign_key "course_schools", "schools"
  add_foreign_key "course_users", "courses"
  add_foreign_key "course_users", "users"
  add_foreign_key "school_users", "schools"
  add_foreign_key "school_users", "users"
  add_foreign_key "submission_users", "submissions"
  add_foreign_key "submission_users", "users"
end
