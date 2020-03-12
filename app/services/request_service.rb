# frozen_string_literal: true

class RequestService
  attr_reader :req

  def initialize(current_user, request, params = {})
    @user = current_user
    @req = request
    @attendance = Attendance.find_by(user: @req.user, day: @req.attendance_day)
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
      @attendance ? @attendance.update!(attendance_params) : Attendance.create!(attendance_params.merge(day: @req.attendance_day, user: @req.user))
    elsif @req.annual_leave? && !Attendance.exists?(user: @req.user, day: @req.attendance_day)
      Attendance.create(user: @req.user, day: @req.attendance_day, off_status: 'annual_leave')
    end
  end

  def attendance_params
    {}.tap do |obj|
      if @req.attended_at.present?
        obj[:attended_at]      = @req.attended_at
        obj[:attending_status] = AttendanceService.attending_status(@user.company, @req.attended_at, @req.attendance_day)
      end

      if @req.left_at.present?
        obj[:left_at]        = @req.left_at
        obj[:leaving_status] = AttendanceService.leaving_status(@user.company, @req.left_at, @req.attendance_day)
      end

      obj[:off_status]          = nil
      obj[:minutes_attend_late] = TotalTimeOfLatency.new(@user.company, @req.attended_at || @attendance&.attended_at).execute
      obj[:minutes_leave_early] = TotalTimeOfLatency.new(@user.company, @req.left_at || @attendance&.left_at, @attendance).execute
      obj[:working_hours]       = CountWorkingHoursService.new(
        @user.company,
        @req.attended_at || @attendance&.attended_at,
        @req.left_at     || @attendance&.left_at,
        @req.attendance_day
      ).execute
    end
  end
end
