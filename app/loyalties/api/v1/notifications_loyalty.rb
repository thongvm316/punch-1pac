# frozen_string_literal: true

class Api::V1::NotificationsLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def read?
    true
  end
end
