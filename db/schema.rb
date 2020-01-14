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

ActiveRecord::Schema.define(version: 2020_01_13_065210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "activitable_id", null: false
    t.string "activitable_type", null: false
    t.string "kind", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activitable_id", "activitable_type"], name: "index_activities_on_activitable_id_and_activitable_type"
    t.index ["user_id"], name: "index_activities_on_user_id"
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

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
    t.integer "target", default: 0, null: false
    t.boolean "sent", default: false, null: false
    t.integer "status", default: 0, null: false
    t.string "content", limit: 500, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "due_date", null: false
    t.index ["admin_id"], name: "index_announcements_on_admin_id"
  end

  create_table "attendances", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "day", null: false
    t.time "attended_at"
    t.time "left_at"
    t.string "attending_status"
    t.string "leaving_status"
    t.string "off_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "working_hours", default: 0, null: false
    t.integer "minutes_attend_late", default: 0, null: false
    t.integer "minutes_leave_early", default: 0, null: false
    t.index ["day"], name: "index_attendances_on_day"
    t.index ["user_id", "day"], name: "index_attendances_on_user_id_and_day", unique: true
    t.index ["user_id"], name: "index_attendances_on_user_id"
  end

  create_table "business_days", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "weekday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.time "morning_started_at", default: "2000-01-01 00:00:00", null: false
    t.time "morning_ended_at", default: "2000-01-01 00:00:00", null: false
    t.time "afternoon_started_at", default: "2000-01-01 00:00:00", null: false
    t.time "afternoon_ended_at", default: "2000-01-01 00:00:00", null: false
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
    t.text "logo_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "app_blocked_by_ip", default: false, null: false
    t.integer "punch_method", default: 0, null: false
    t.index ["namespace"], name: "index_companies_on_namespace", unique: true
  end

  create_table "device_tokens", force: :cascade do |t|
    t.string "device_token", null: false
    t.string "device_type", null: false
    t.boolean "permission"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["device_token"], name: "index_device_tokens_on_device_token"
    t.index ["user_id"], name: "index_device_tokens_on_user_id"
  end

  create_table "group_permissions", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "permission_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.text "image_data"
  end

  create_table "holidays", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.date "started_at", null: false
    t.date "ended_at", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "national_holiday_id"
    t.index ["company_id", "national_holiday_id"], name: "index_holidays_on_company_id_and_national_holiday_id", unique: true
    t.index ["company_id"], name: "index_holidays_on_company_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.bigint "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti", unique: true
  end

  create_table "national_holidays", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.string "country", null: false
    t.string "name", null: false
    t.date "started_at", null: false
    t.date "ended_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_national_holidays_on_admin_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "name", null: false
    t.string "action", null: false
    t.string "controller", null: false
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pghero_query_stats", force: :cascade do |t|
    t.text "database"
    t.text "user"
    t.text "query"
    t.bigint "query_hash"
    t.float "total_time"
    t.bigint "calls"
    t.datetime "captured_at"
    t.index ["database", "captured_at"], name: "index_pghero_query_stats_on_database_and_captured_at"
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

  create_table "requests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "reason", limit: 500, null: false
    t.time "attended_at"
    t.time "left_at"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "admin_reason"
    t.bigint "admin_id"
    t.integer "kind", default: 0, null: false
    t.date "attendance_day", null: false
    t.index ["attendance_day"], name: "index_requests_on_attendance_day"
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

  create_table "settings", force: :cascade do |t|
    t.string "settingable_type"
    t.bigint "settingable_id"
    t.integer "name", default: 0, null: false
    t.json "options", default: {}, null: false
    t.integer "min_value", default: 0
    t.integer "max_value", default: 0
    t.boolean "active", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["settingable_type", "settingable_id", "name"], name: "index_settings_on_settingable_type_and_settingable_id_and_name", unique: true
    t.index ["settingable_type", "settingable_id"], name: "index_settings_on_settingable_type_and_settingable_id"
  end

  create_table "user_groups", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "activity_id"], name: "index_user_notifications_on_user_id_and_activity_id", unique: true
    t.index ["user_id"], name: "index_user_notifications_on_user_id"
  end

  create_table "user_permissions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "permission_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.integer "role", default: 0, null: false
    t.boolean "owner", default: false, null: false
    t.string "name", null: false
    t.integer "gender", default: 0, null: false
    t.string "position"
    t.text "avatar_data"
    t.string "language", default: "en", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "last_read_noti_id", default: 0, null: false
    t.boolean "password_changed", default: false, null: false
    t.boolean "activated", default: true, null: false
    t.datetime "activated_at"
    t.datetime "deactivated_at"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
