# frozen_string_literal: true
# == Schema Information
#
# Table name: read_requests
#
#  id         :integer          not null, primary key
#  request_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_read_requests_on_request_id              (request_id)
#  index_read_requests_on_request_id_and_user_id  (request_id,user_id) UNIQUE
#  index_read_requests_on_user_id                 (user_id)
#


class ReadRequest < ApplicationRecord
end
