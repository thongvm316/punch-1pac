# frozen_string_literal: true

class HealthcheckController < ApplicationController
  def index
    render json: current_user, status: 200
  end
end
