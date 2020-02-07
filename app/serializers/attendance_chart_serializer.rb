# frozen_string_literal: true

class AttendanceChartSerializer < ApplicationSerializer
  attributes :attend_days, :left_days, :attend_ok, :attend_late, :leave_ok, :leave_early, :leave, :minutes_leave_early, :minutes_attend_late, :working_hours

  def attend_ok
    object&.attend_ok.to_i
  end

  def attend_late
    object&.attend_late.to_i
  end

  def attend_days
    attend_ok + attend_late
  end

  def leave_ok
    object&.leave_ok.to_i
  end

  def leave_early
    object&.leave_early.to_i
  end

  def left_days
    leave_ok + leave_early
  end

  def leave
    0
  end

  def minutes_leave_early
    convert_json(object&.minutes_leave_early)
  end

  def minutes_attend_late
    convert_json(object&.minutes_attend_late)
  end

  def working_hours
    convert_json(object&.working_hours)
  end

  def convert_json(time)
    {
      hours: time.to_i / 3600,
      mins: time.to_i % 3600 / 60
    }
  end
end
