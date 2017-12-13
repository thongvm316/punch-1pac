# frozen_string_literal: true

class BusinessDaySerializer < ApplicationSerializer
  attributes :id, :started_at, :ended_at, :weekday

  def started_at
    object.started_at.strftime('%H:%M')
  end

  def ended_at
    object.ended_at.strftime('%H:%M')
  end
end
