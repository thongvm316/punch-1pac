# frozen_string_literal: true

class V1::AttendancesController < ApplicationController
  def create
    authorize Attendance
    attendance = AttendanceService.new(current_user).attend
    if attendance
      render json: attendance, serializer: AttendanceSerializer, status: 201
    else
      head(200)
    end
  end

  def update
    authorize Attendance
    attendance = AttendanceService.new(current_user).leave
    render json: attendance, serializer: AttendanceSerializer, status: 200
  end
end
