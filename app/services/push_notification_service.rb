# frozen_string_literal: true

class PushNotificationService
  def initialize(user_id = nil, body = nil)
    @body = body
    @user_id = user_id
  end

  def execute
    fcm = FCM.new(ENV['SERVER_KEY'])

    device_tokens =  DeviceToken.where(user_id: @user_id).pluck(:device_token)
    fcm.send(device_tokens, notification: @body)
  end
end
