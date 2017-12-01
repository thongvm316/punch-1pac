# frozen_string_literal: true

# == Schema Information
#
# Table name: allowed_ips
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  ip_address :inet             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_allowed_ips_on_company_id                 (company_id)
#  index_allowed_ips_on_company_id_and_ip_address  (company_id,ip_address) UNIQUE
#  index_allowed_ips_on_ip_address                 (ip_address)
#

class AllowedIp < ApplicationRecord
  belongs_to :company

  validates :ip_address, presence: true
end
