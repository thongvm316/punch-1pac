# frozen_string_literal: true

class GroupSerializer < ApplicationSerializer
  attributes :id, :name
  has_many :users, serializer: UserSerializer
end
