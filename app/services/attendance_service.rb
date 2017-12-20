# frozen_string_literal: true

class AttendanceService
  def initialize(current_user)
    @user = current_user
    @now = Time.current
  end

  class << self
    def attending_status(company, attended_at, attendance)
      weekday = attendance ? attendance.day.strftime('%A') : attended_at.strftime('%A')
      business_day = company.business_days.find_by(weekday: weekday.downcase)

      return unless business_day

      if attended_at.strftime('%H:%M') > business_day.started_at.strftime('%H:%M')
        'attend_late'
      else
        'attend_ok'
      end
    end

    def leaving_status(company, left_at, attendance)
      weekday = attendance.day.strftime('%A')
      business_day = company.business_days.find_by(weekday: weekday.downcase)

      return unless business_day

      if left_at.strftime('%H:%M') < business_day.ended_at.strftime('%H:%M')
        'leave_early'
      else
        'leave_ok'
      end
    end
  end

  def attend
    verify_ip_address!
    attendance = @user.attendances.find_by(day: @now)
    if attendance&.off_status
      attendance.update_attributes(
        attended_at: @now,
        attending_status: self.class.attending_status(@user.company, @now, attendance),
        off_status: nil
      )
      attendance
    elsif attendance.nil?
      @user.attendances.create(
        day: @now,
        attended_at: @now,
        attending_status: self.class.attending_status(@user.company, @now, nil)
      )
    end
  end

  def leave
    verify_ip_address!
    attendance = @user.attendances.attended.find_by!(day: @now, left_at: nil)
    attendance.update_attributes(
      left_at: @now,
      leaving_status: self.class.leaving_status(@user.company, @now, attendance)
    )
    attendance
  end

  private

  def verify_ip_address!
    ips = @user.company.allowed_ips.pluck(:ip_address)
    return if ips.blank?
    return if ips.include?(request.remote_ip)
    raise AppErrors::Error403
  end
end
