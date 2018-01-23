# frozen_string_literal: true

class Api::V1::AttendancesController < Api::V1::BaseController
  def create
    authorize!
    attendance = AttendanceService.new(current_user).attend
    if attendance
      render json: attendance, serializer: AttendanceSerializer, status: 201
    else
      head(200)
    end
  end

  def update
    authorize!
    attendance = AttendanceService.new(current_user).leave
    render json: attendance, serializer: AttendanceSerializer, status: 200
  end
end
