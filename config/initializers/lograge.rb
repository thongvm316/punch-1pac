# frozen_string_literal: true

if Rails.env.production?
  Rails.application.configure do
    config.lograge.enabled = true
    config.lograge.base_controller_class = 'ActionController::API'
  end
end
