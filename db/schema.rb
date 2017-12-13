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

ActiveRecord::Schema.define(version: 20171201065420) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allowed_ips", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.inet "ip_address", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "ip_address"], name: "index_allowed_ips_on_company_id_and_ip_address", unique: true
    t.index ["company_id"], name: "index_allowed_ips_on_company_id"
    t.index ["ip_address"], name: "index_allowed_ips_on_ip_address"
  end

  create_table "announcements", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.string "send_type", default: "all", null: false
    t.string "send_status", default: "sending", null: false
    t.string "status", default: "normal", null: false
    t.string "title", null: false
    t.string "content", limit: 2000, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_announcements_on_admin_id"
  end

  create_table "attendances", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "day", null: false
    t.time "attended_at"
    t.time "left_at"
    t.text "status", default: ["absent"], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "day"], name: "index_attendances_on_user_id_and_day", unique: true
    t.index ["user_id"], name: "index_attendances_on_user_id"
  end

  create_table "business_days", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.time "started_at", null: false
    t.time "ended_at", null: false
    t.string "weekday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_business_days_on_company_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "namespace", null: false
    t.string "name", null: false
    t.string "country", null: false
    t.string "industry", null: false
    t.string "address", null: false
    t.string "phone_number", null: false
    t.string "postal_code"
    t.string "tax_code"
    t.boolean "activated", default: true, null: false
    t.string "timezone", default: "Asia/Hanoi", null: false
    t.float "breaktime", default: 1.0, null: false
    t.string "breakdays", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["namespace"], name: "index_companies_on_namespace", unique: true
  end

  create_table "company_holidays", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "holiday_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "holiday_id"], name: "index_company_holidays_on_company_id_and_holiday_id", unique: true
    t.index ["company_id"], name: "index_company_holidays_on_company_id"
    t.index ["holiday_id"], name: "index_company_holidays_on_holiday_id"
  end

  create_table "departments", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_departments_on_company_id"
  end

  create_table "holidays", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.string "country", null: false
    t.string "name", null: false
    t.date "started_at", null: false
    t.date "ended_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_holidays_on_admin_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.bigint "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti", unique: true
  end

  create_table "read_announcements", force: :cascade do |t|
    t.bigint "announcement_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["announcement_id", "user_id"], name: "index_read_announcements_on_announcement_id_and_user_id", unique: true
    t.index ["announcement_id"], name: "index_read_announcements_on_announcement_id"
    t.index ["user_id"], name: "index_read_announcements_on_user_id"
  end

  create_table "read_requests", force: :cascade do |t|
    t.bigint "request_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["request_id", "user_id"], name: "index_read_requests_on_request_id_and_user_id", unique: true
    t.index ["request_id"], name: "index_read_requests_on_request_id"
    t.index ["user_id"], name: "index_read_requests_on_user_id"
  end

  create_table "requests", force: :cascade do |t|
    t.bigint "attendance_id", null: false
    t.bigint "user_id", null: false
    t.string "reason", limit: 500, null: false
    t.time "attended_at"
    t.time "left_at"
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attendance_id"], name: "index_requests_on_attendance_id"
    t.index ["user_id"], name: "index_requests_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "jti", null: false
    t.bigint "exp", null: false
    t.inet "ip_address", null: false
    t.string "client"
    t.string "device_name"
    t.string "device_type", null: false
    t.string "os", null: false
    t.string "user_agent", limit: 1000, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_sessions_on_jti", unique: true
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "department_id"
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "role", default: "member", null: false
    t.boolean "owner", default: false, null: false
    t.string "name", null: false
    t.string "gender", default: "male", null: false
    t.text "avatar_data"
    t.string "language", default: "en", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["department_id"], name: "index_users_on_department_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
