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
      attendance_params[:attended_at] = @req.attended_at
      attendance_params[:attending_status] = AttendanceService.attending_status(@user.company, @req.attended_at, @attendance)
    end
    if @req.left_at.present?
      attendance_params[:left_at] = @req.left_at
      attendance_params[:leaving_status] = AttendanceService.leaving_status(@user.company, @req.left_at, @attendance)
    end
    ApplicationRecord.transaction do
      @req.update!(status: 'approved')
      @attendance.update!(attendance_params)
      Activity.track(@user, @req, 'approve')
    end
  end

  def reject
    @req.update(status: 'rejected')
    Activity.track(@user, @req, 'reject')
  end
end
