# frozen_string_literal: true
# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  company_id             :integer          not null
#  department_id          :integer
#  role                   :string           default(NULL), not null
#  owner                  :boolean          default(FALSE), not null
#  name                   :string           not null
#  gender                 :string           default("male"), not null
#  avatar_data            :text
#  language               :string           default("en"), not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
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

  devise :database_authenticatable, :registerable, :recoverable, :validatable

  enumerize :role, in: %i[superadmin admin member]
  enumerize :gender, in: %i[male female]
  enumerize :language, in: %i[vi en jp]

  belongs_to :company
  belongs_to :department, optional: true
  has_many :attendances, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :requests, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 100 }
end
