# frozen_string_literal: true

class AttendanceService
  def initialize(current_user, remote_ip)
    @user = current_user
    @now = Time.current
    @remote_ip = remote_ip
  end

  class << self
    def attending_status(company, attended_at, attendance_day)
      business_day = company.business_days.find_by(weekday: attendance_day.strftime('%A').downcase)

      return 'attend_ok' unless business_day

      if attended_at.strftime('%H:%M') > business_day.morning_started_at.strftime('%H:%M')
        'attend_late'
      else
        'attend_ok'
      end
    end

    def leaving_status(company, left_at, attendance_day)
      business_day = company.business_days.find_by(weekday: attendance_day.strftime('%A').downcase)

      return 'leave_ok' unless business_day

      if left_at.strftime('%H:%M') < business_day.afternoon_ended_at.strftime('%H:%M')
        'leave_early'
      else
        'leave_ok'
      end
    end
  end

  def attend
    verify_ip_address!
    return false if @user.attendances.find_by(day: @now)
    attendance = @user.attendances.build(
      day: @now,
      attended_at: @now,
      minutes_attend_late: TotalTimeOfLatency.new(@user.company, @now).execute,
      attending_status: self.class.attending_status(@user.company, @now, @now)
    )
    attendance.save ? attendance : false
  end

  def leave
    verify_ip_address!
    attendance = @user.attendances.attended.find_by!(day: @now, left_at: nil)
    attendance.assign_attributes(
      left_at: @now,
      working_hours: CountWorkingHoursService.new(@user.company, attendance.attended_at, @now, attendance.day).execute,
      minutes_leave_early: TotalTimeOfLatency.new(@user.company, @now, attendance).execute,
      leaving_status: self.class.leaving_status(@user.company, @now, attendance.day)
    )
    attendance.save ? attendance : false
  end

  private

  def verify_ip_address!
    ips = @user.company.allowed_ips.pluck(:ip_address)
    return if ips.blank?
    return if ips.include?(@remote_ip)
    raise AppErrors::Error403
  end

  def block_time_expired!(attendance)
    raise AppErrors::Error403 unless (@now - Attendance::BLOCK_TIME) > attendance.updated_at
  end
end
