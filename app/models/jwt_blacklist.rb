# frozen_string_literal: true
# == Schema Information
#
# Table name: jwt_blacklists
#
#  id         :integer          not null, primary key
#  jti        :string           not null
#  exp        :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_jwt_blacklists_on_jti  (jti) UNIQUE
#


class JwtBlacklist < ApplicationRecord
end
