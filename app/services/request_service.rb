# frozen_string_literal: true

class RequestService
  def initialize(current_user, request)
    @user = current_user
    @req = request
    @attendance = @req.attendance
  end

  def approve
    attendance_params = {}
    if @req.attended_at.present?
      attendance_params.merge!(
        attended_at: @req.attended_at,
        attending_status: AttendanceService.attending_status(@user.company, @req.attended_at, @attendance)
      )
    end
    if @req.left_at.present?
      attendance_params.merge!(
        left_at: @req.left_at,
        leaving_status: AttendanceService.leaving_status(@user.company, @req.left_at, @attendance)
      )
    end
    ApplicationRecord.transaction do
      @req.update!(status: 'approved')
      @attendance.update!(attendance_params)
    end
  end

  def reject
    @req.update(status: 'rejected')
  end
end
