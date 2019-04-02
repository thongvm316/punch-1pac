# frozen_string_literal: true

class Api::V1::DeviceTokensLoyalty < ApplicationLoyalty
  def create?
    true
  end

  def destroy?
    true
  end
end
