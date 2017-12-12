# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  company_id             :integer          not null
#  department_id          :integer
#  email                  :string           not null
#  password_digest        :string           not null
#  role                   :string           default(NULL), not null
#  owner                  :boolean          default(FALSE), not null
#  name                   :string           not null
#  gender                 :string           default("male"), not null
#  avatar_data            :text
#  language               :string           default("en"), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_company_id            (company_id)
#  index_users_on_department_id         (department_id)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  extend Enumerize
  has_secure_password

  REGEX_VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  PASSWORD_RESET_TOKEN_EXPIRE = 1800.0

  enumerize :role, in: %i[superadmin admin member]
  enumerize :gender, in: %i[male female]
  enumerize :language, in: %i[vi en jp]

  belongs_to :company
  belongs_to :department, optional: true
  has_many :attendances, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :requests, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 100 }, format: { with: REGEX_VALID_EMAIL }
  validates :password, length: { minimum: 6, maximum: 32 }, allow_nil: true
  validates :password_confirmation, presence: true, if: -> { password.present? }

  def reset_password_token_valid?(token)
    user = find_by!(reset_password_token: token)
    return false unless (Time.current - user.reset_password_sent_at) < PASSWORD_RESET_TOKEN_EXPIRE
    user
  end

  def self.init_password_reset_token!
    self.reset_password_token = loop do
      random_token = SecureRandom.base58(24)
      break random_token unless self.class.exists?(reset_password_token: random_token)
    end
    self.reset_password_sent_at = Time.current
    save!
  end
end
