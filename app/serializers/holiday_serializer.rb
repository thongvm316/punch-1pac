# frozen_string_literal: true

class HolidaySerializer < ApplicationSerializer
  attributes :id, :name, :started_at, :ended_at
end
