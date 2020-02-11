# frozen_string_literal: true

class GroupReportSerializer < ApplicationSerializer
  attributes :id, :name, :email, :avatar_url, :attend_ok, :attend_late, :leave_ok, :leave_early, :leave, :minutes_attend_late, :minutes_leave_early, :working_hours

  def avatar_url
    ActionController::Base.helpers.asset_url(object.avatar_url)
  end

  def attend_ok
    object.attend_ok.to_i
  end

  def attend_late
    object.attend_late.to_i
  end

  def leave_ok
    object.leave_ok.to_i
  end

  def leave_early
    object.leave_early.to_i
  end

  def leave
    ForgotPunchInDaysService.new(object, object.company, instance_options[:params]).execute.size
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
