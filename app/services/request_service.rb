# frozen_string_literal: true

class RequestService
  def initialize(current_user, request, params = {})
    @user = current_user
    @req = request
    @attendance = @req.attendance
    @params = params
  end

  def approve
    ApplicationRecord.transaction do
      @req.update!(status: 'approved', admin_id: @user.id)
      approve_request
    end
  end

  def reject
    @req.update(status: 'rejected', admin_id: @user.id, admin_reason: @params[:admin_reason])
  end

  private

  def approve_request
    if @req.attendance?
      attendance_params = {}
      if @req.attended_at.present?
        attendance_params[:attended_at] = @req.attended_at
        attendance_params[:attending_status] = AttendanceService.attending_status(@user.company, @req.attended_at, @attendance)
      end
      if @req.left_at.present?
        attendance_params[:left_at] = @req.left_at
        attendance_params[:leaving_status] = AttendanceService.leaving_status(@user.company, @req.left_at, @attendance)
      end
      attendance_params[:working_hours] = CountWorkingHoursService.new(@user.company, @req.attended_at || @attendance.attended_at, @req.left_at || @attendance.left_at, @attendance).execute
      @attendance.update!(attendance_params)
    elsif @req.annual_leave?
      Attendance.create(user: @req.user, day: @req.annual_leave_day, off_status: 'annual_leave')
    end
  end
end
