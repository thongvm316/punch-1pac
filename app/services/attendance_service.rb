# frozen_string_literal: true

class AttendanceService
  def initialize(current_user, remote_ip)
    @user = current_user
    @now = Time.current
    @remote_ip = remote_ip
  end

  class << self
    def attending_status(company, attended_at, attendance)
      weekday = attendance ? attendance.day.strftime('%A') : attended_at.strftime('%A')
      business_day = company.business_days.find_by(weekday: weekday.downcase)

      return 'attend_ok' unless business_day

      if attended_at.strftime('%H:%M') > business_day.morning_started_at.strftime('%H:%M')
        'attend_late'
      else
        'attend_ok'
      end
    end

    def leaving_status(company, left_at, attendance)
      weekday = attendance.day.strftime('%A')
      business_day = company.business_days.find_by(weekday: weekday.downcase)

      return 'leave_ok' unless business_day

      if left_at.strftime('%H:%M') < business_day.afternoon_ended_at.strftime('%H:%M')
        'leave_early'
      else
        'leave_ok'
      end
    end

    def count_working_hours(company, attended_at, left_at, attendance)
      weekday                   = attendance.day.strftime('%A')
      business_day              = company.business_days.find_by(weekday: weekday.downcase)

      return 0 unless business_day

      morning_started_at        = business_day.morning_started_at.to_i
      morning_ended_at          = business_day.morning_ended_at.to_i
      afternoon_started_at      = business_day.afternoon_started_at.to_i
      afternoon_ended_at        = business_day.afternoon_ended_at.to_i
      attended_at               = attended_at.nil? ? attendance.attended_at.to_i : attended_at.to_i
      left_at                   = Time.zone.local(2000, 1, 1, left_at.hour, left_at.min, left_at.sec).to_i

      before_morning_start_time = attended_at < morning_started_at
      after_morning_start_time  = attended_at.between?(morning_started_at, morning_ended_at)
      in_afternoon_break_time   = (morning_ended_at..afternoon_started_at)
      in_morning_working_time   = (morning_started_at..morning_ended_at)
      in_afternoon_working_time = (afternoon_started_at..afternoon_ended_at)
      in_afternoon_leave_time   = (afternoon_started_at..9999999999)

      return 0 if (left_at < morning_started_at) || (attended_at > afternoon_ended_at)

      morning_start   = if before_morning_start_time
                          morning_started_at
                        elsif after_morning_start_time
                          attended_at
                        else
                          0
                        end

      morning_end     = if in_afternoon_break_time.include? left_at
                          morning_ended_at
                        elsif in_morning_working_time.include? left_at
                          left_at
                        elsif before_morning_start_time || after_morning_start_time
                          morning_ended_at
                        else
                          0
                        end

      afternoon_start = if in_afternoon_break_time.include? attended_at
                          afternoon_started_at
                        elsif in_afternoon_working_time.include? attended_at
                          attended_at
                        elsif in_afternoon_leave_time.include? left_at
                          afternoon_started_at
                        else
                          0
                        end

      afternoon_end   = if left_at > afternoon_ended_at
                          afternoon_ended_at
                        elsif in_afternoon_working_time.include? left_at
                          left_at
                        else
                          0
                        end

      (morning_end - morning_start) + (afternoon_end - afternoon_start)
    end
  end

  def attend
    verify_ip_address!
    return false if @user.attendances.find_by(day: @now)
    attendance = @user.attendances.build(
      day: @now,
      attended_at: @now,
      attending_status: self.class.attending_status(@user.company, @now, nil)
    )
    attendance.save ? attendance : false
  end

  def leave
    verify_ip_address!
    attendance = @user.attendances.attended.find_by!(day: @now, left_at: nil)
    attendance.assign_attributes(
      left_at: @now,
      working_hours: self.class.count_working_hours(@user.company, nil, @now, attendance),
      leaving_status: self.class.leaving_status(@user.company, @now, attendance)
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
