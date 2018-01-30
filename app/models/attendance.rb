# frozen_string_literal: true

# == Schema Information
#
# Table name: attendances
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  day              :date             not null
#  attended_at      :time
#  left_at          :time
#  attending_status :string
#  leaving_status   :string
#  off_status       :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_attendances_on_user_id          (user_id)
#  index_attendances_on_user_id_and_day  (user_id,day) UNIQUE
#

class Attendance < ApplicationRecord
  belongs_to :user
  has_many :requests, dependent: :destroy

  validates :day, presence: true
  validates :attending_status, inclusion: %w[attend_ok attend_late], allow_nil: true
  validates :leaving_status, inclusion: %w[leave_ok leave_early], allow_nil: true
  validates :off_status, inclusion: %w[holiday weekend annual_leave], allow_nil: true

  scope :attended, -> { where.not(attended_at: nil) }

  scope :between, ->(from_date, to_date) {
    where(day: from_date..to_date)
  }

  scope :with_status, ->(status) {
    where(attending_status: status).or(where(leaving_status: status)).or(where(off_status: status))
  }

  scope :search_by, ->(params) {
    q = all
    q = q.with_status(params[:status]) if params[:status].present?
    q = q.between(params[:from_date], params[:to_date]) if params[:from_date].present? && params[:to_date].present?
    q
  }
end
