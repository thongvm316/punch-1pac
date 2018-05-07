# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name, :image_url, :description
  has_many :users, serializer: UserSerializer

  def users
    object.users.unscope(where: :activated)
  end

  def image_url
    ActionController::Base.helpers.asset_url(object.image_url)
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d')
  end
end
