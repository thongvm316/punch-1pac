# frozen_string_literal: true

class Api::V1::AnnouncementsLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def show?
    true
  end
end
