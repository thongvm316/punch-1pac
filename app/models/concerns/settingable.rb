# frozen_string_literal: true

module Settingable
  extend ActiveSupport::Concern

  included do
    has_many :settings, as: :settingable, dependent: :destroy
  end

  Setting.names.keys.each do |name|
    define_method(name) { settings.find_by(name: name) }
  end
end
