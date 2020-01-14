# frozen_string_literal: true

class UserAttendanceQuery < ApplicationQuery
  def execute
    AttendanceQuery.new(relation, params)
  end
end
