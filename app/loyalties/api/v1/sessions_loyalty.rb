# frozen_string_literal: true

class Api::V1::SessionsLoyalty < ApplicationLoyalty
  def index?
    true
  end

  def destroy?
    return false if record[:current_session] == record[:session]
    true
  end
end
