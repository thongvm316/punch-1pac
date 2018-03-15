# frozen_string_literal: true

class AttendanceChartSerializer < ApplicationSerializer
  attributes :month, :status_count

  def month
    object&.month&.strftime('%-m').to_i
  end
end
