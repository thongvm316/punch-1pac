# frozen_string_literal: true

# == Schema Information
#
# Table name: activities
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  activitable_id   :integer          not null
#  activitable_type :string           not null
#  kind             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_activities_on_activitable_id_and_activitable_type  (activitable_id,activitable_type)
#  index_activities_on_user_id                              (user_id)
#

class Activity < ApplicationRecord
  ACTION_KINDS = {
    request: %w[create edit approve reject],
    attendance: %w[punch_in punch_out]
  }.freeze

  belongs_to :user
  belongs_to :activitable, polymorphic: true
  has_many :user_notifications, dependent: :destroy

  validates :kind, presence: true, inclusion: { in: ACTION_KINDS.values.flatten.uniq }
end
