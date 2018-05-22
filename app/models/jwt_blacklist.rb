# frozen_string_literal: true
# == Schema Information
#
# Table name: jwt_blacklist
#
#  id         :bigint(8)        not null, primary key
#  jti        :string           not null
#  exp        :bigint(8)        not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_jwt_blacklist_on_jti  (jti) UNIQUE
#

class JwtBlacklist < ApplicationRecord
  self.table_name = 'jwt_blacklist'

  validates :jti, presence: true, uniqueness: true
  validates :exp, presence: true
end
