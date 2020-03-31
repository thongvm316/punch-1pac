# frozen_string_literal: true

return if Rails.env.test?

Rails.application.config.action_mailer.asset_host            = ENV['APP_HOST']
Rails.application.config.action_mailer.perform_deliveries    = true
Rails.application.config.action_mailer.default_options       = { from: "#{ENV['APP_NAME']} <no-reply@punch.ooo>" }
Rails.application.config.action_mailer.delivery_method       = Rails.env.development? ? :letter_opener : :aws_sdk
Rails.application.config.action_mailer.default_url_options   = { host: ENV['APP_DOMAIN'], protocol: ENV['PROTOCOL'] }
Rails.application.config.action_mailer.raise_delivery_errors = Rails.env.development?

case Rails.application.config.action_mailer.delivery_method
when :smtp
  Rails.application.config.action_mailer.smtp_settings = {
    address: ENV['SES_ADDRESS'],
    port: 587,
    user_name: ENV['SES_USERNAME'],
    password:  ENV['SES_PASSWORD'],
    authentication: :login,
    enable_starttls_auto: true
  }
when :aws_sdk
  credentials = Aws::Credentials.new(ENV['AWS_ACCESS_KEY'], ENV['AWS_SECRET_KEY'])
  Aws::Rails.add_action_mailer_delivery_method(:aws_sdk, credentials: credentials, region: 'us-west-2')
end
