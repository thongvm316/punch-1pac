# frozen_string_literal: true

class TrackAndNotifyActivityWorker
  include Sidekiq::Worker

  def perform(user_id, activitable_id, activitable_type, kind)
    current_user = User.find(user_id)
    activitable = activitable_type.constantize.find(activitable_id)
    Activity.track(current_user, activitable, kind)
  end
end
