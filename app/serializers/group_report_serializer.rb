# frozen_string_literal: true

class GroupReportSerializer < ApplicationSerializer
  attributes :id, :name, :email, :avatar_url, :attend_ok, :attend_late, :leave_ok, :leave_early, :annual_leave, :working_hours

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

  def annual_leave
    object.annual_leave.to_i
  end

  def working_hours
    {
      hours: object.working_hours.to_i / 3600,
      mins: object.working_hours.to_i % 3600 / 60
    }
  end
end
