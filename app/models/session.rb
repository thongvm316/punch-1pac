# frozen_string_literal: true

# == Schema Information
#
# Table name: sessions
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  jti         :string           not null
#  exp         :datetime         not null
#  client_ip   :inet             not null
#  client_name :string           not null
#  client_os   :string           not null
#  client_ua   :string(1000)     not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_sessions_on_jti      (jti) UNIQUE
#  index_sessions_on_user_id  (user_id)
#

class Session < ApplicationRecord
  belongs_to :user

  validates :jti, presence: true, uniqueness: true
  validates :exp, presence: true
  validates :client_ip, presence: true
  validates :client_name, presence: true
  validates :client_os, presence: true
  validates :client_ua, presence: true, length: { maximum: 1000 }
end
