# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  company_id             :integer          not null
#  email                  :string           not null
#  password_digest        :string           not null
#  role                   :integer          default("member"), not null
#  owner                  :boolean          default(FALSE), not null
#  name                   :string           not null
#  gender                 :integer          default("male"), not null
#  position               :string
#  avatar_data            :text
#  language               :string           default("en"), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  last_read_noti_id      :integer          default(0), not null
#  password_changed       :boolean          default(FALSE), not null
#
# Indexes
#
#  index_users_on_company_id            (company_id)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  has_secure_password

  REGEX_VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  RESET_PASSWORD_TOKEN_EXPIRY = 1800.0

  enum role: { member: 0, admin: 1, superadmin: 2 }
  enum gender: { male: 0, female: 1 }

  belongs_to :company
  has_many :attendances, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :requests, dependent: :destroy
  has_many :user_permissions, dependent: :destroy
  has_many :permissions, through: :user_permissions
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups
  has_many :activities, dependent: :destroy
  has_many :user_notifications, dependent: :destroy
  has_many :notifications, through: :user_notifications, source: :activity

  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 100 }, format: { with: REGEX_VALID_EMAIL }
  validates :password, length: { minimum: 6, maximum: 32 }, allow_nil: true
  validates :language, presence: true, inclusion: { in: I18n.available_locales.map(&:to_s) }

  include ImageUploader::Attachment.new(:avatar)

  scope :with_today_attendance, -> {
    sanitized_today_cond = sanitize_sql("attendances.day = '#{Time.current}'")
    select('users.id, users.name, users.avatar_data, users.email, users.position, users.gender',
           'attendances.id as attendance_id, attendances.attended_at as attended_at, attendances.left_at as left_at')
      .joins("LEFT JOIN attendances ON users.id = attendances.user_id AND #{sanitized_today_cond}")
  }

  scope :not_in_group, ->(group_id) {
    left_outer_joins(:user_groups)
      .merge(UserGroup.not_in_group(group_id))
      .merge(User.where('users.role != ? OR users.role = ? AND user_groups.group_id IS NULL', User.roles[:member], User.roles[:member]))
  }
  scope :by_group, ->(current_user, group_id = nil) {
    q = all
    if current_user.role == 'superadmin'
      q = q.where(id: current_user.company.users)
    elsif %w[member admin].include?(current_user.role)
      q = q.where(id: UserGroup.with_group(current_user.groups))
    end
    q = q.where(id: UserGroup.with_group(group_id)) if group_id.present?
    q
  }
  scope :search_by, ->(params, current_user) {
    q = all
    q = q.where('email LIKE ?', "%#{params[:email]}%") if params[:email].present?
    q = q.not_in_group(params[:not_in_group_id]) if params[:not_in_group_id].present?
    q = q.where.not(id: params[:exclude_user_ids]) if params[:exclude_user_ids].present?
    q = q.by_group(current_user, params[:group_id]) if params[:type] && params[:type] == 'users_in_group'
    q = q.where('lower(email) LIKE ? OR lower(name) LIKE ?', "%#{params[:name_or_email].downcase}%", "%#{params[:name_or_email].downcase}%") if params[:name_or_email].present?
    q
  }

  def self.count_attendance_status(date)
    select(
      :id,
      :name,
      :email,
      :avatar_data,
      "(#{Attendance.status_count_on_month('attend_ok', 'attending_status', date).where('attendances.user_id = users.id').to_sql})",
      "(#{Attendance.status_count_on_month('attend_late', 'attending_status', date).where('attendances.user_id = users.id').to_sql})",
      "(#{Attendance.status_count_on_month('leave_ok', 'leaving_status', date).where('attendances.user_id = users.id').to_sql})",
      "(#{Attendance.status_count_on_month('leave_early', 'leaving_status', date).where('attendances.user_id = users.id').to_sql})",
      "(#{Attendance.status_count_on_month('annual_leave', 'off_status', date).where('attendances.user_id = users.id').to_sql})"
    )
  end

  def self.report(params)
    date = params[:date].present? ? Date.parse(params[:date]) : Date.current
    raise ArgumentError if date.blank?
    count_attendance_status(date).where(id: UserGroup.with_group(params[:group_id]))
  rescue TypeError, ArgumentError
    none
  end

  def self.reset_password_token_valid?(token)
    user = find_by(reset_password_token: token)
    raise AppErrors::InvalidResetPwdToken unless user
    raise AppErrors::ExpiredResetPwdToken unless (Time.current - user.reset_password_sent_at) < RESET_PASSWORD_TOKEN_EXPIRY
    user
  end

  def init_password_reset_token!
    count = 1
    self.reset_password_token = loop do
      raise AppErrors::Error500 if count > 5
      random_token = SecureRandom.base58(24)
      count += 1
      break random_token unless self.class.exists?(reset_password_token: random_token)
    end
    self.reset_password_sent_at = Time.current
    raise AppErrors::Error500 unless save
  end

  def manager?
    superadmin? || admin?
  end

  def current_session(request)
    client = DeviceDetector.new(request.user_agent)
    sessions.find_by(client: client.name, device_type: client.device_type, ip_address: request.remote_ip, os: "#{client.os_name}_#{client.os_full_version}")
  end
end
