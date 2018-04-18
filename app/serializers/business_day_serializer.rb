# frozen_string_literal: true

class BusinessDaySerializer < ApplicationSerializer
  attributes :id, :weekday, :morning_started_at, :morning_ended_at, :afternoon_started_at, :afternoon_ended_at

  def morning_started_at
    object.morning_started_at.strftime('%H:%M')
  end

  def morning_ended_at
    object.morning_ended_at.strftime('%H:%M')
  end

  def afternoon_started_at
    object.afternoon_started_at.strftime('%H:%M')
  end

  def afternoon_ended_at
    object.afternoon_ended_at.strftime('%H:%M')
  end
end
