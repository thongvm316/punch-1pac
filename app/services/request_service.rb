# frozen_string_literal: true

class RequestService
  def initialize(current_user, request_id)
    @user = current_user
    @req = Request.find_by!(id: request_id, status: 'pending')
    @attendance = @req.attendance
  end

  def approve
    ApplicationRecord.transaction do
      @req.update_attributes!(status: 'approved')
      @attendance.update_attributes!(
        attended_at: @req.attended_at,
        attending_status: AttendanceService.attending_status(@user.company, @req.attended_at, @attendance),
        left_at: @req.left_at,
        leaving_status: AttendanceService.leaving_status(@user.company, @req.left_at, @attendance)
      )
    end
  end

  def reject
    @req.update_attributes(status: 'rejected')
  end
end
