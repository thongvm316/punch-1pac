# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name, :image_url, :description, :users_count

  def users_count
    object.users.unscope(where: :activated).count
  end

  def image_url
    ActionController::Base.helpers.asset_url(object.image_url)
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
