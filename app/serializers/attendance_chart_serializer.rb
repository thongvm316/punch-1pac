# frozen_string_literal: true

class AttendanceChartSerializer < ApplicationSerializer
  attributes :month, :status_count

  def month
    object&.month&.strftime('%B')
  end
end
