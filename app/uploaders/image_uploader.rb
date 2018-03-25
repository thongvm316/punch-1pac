# frozen_string_literal: true

class ImageUploader < Shrine
  plugin :determine_mime_type
  plugin :validation_helpers
  plugin :default_url
  plugin :activerecord

  Attacher.validate do
    validate_max_size 2.megabytes, message: I18n.t('errors.messages.less_than', count: '2MB')
    validate_mime_type_inclusion ['image/jpeg', 'image/png', 'image/jpg']
  end

  Attacher.default_url do |_options|
    ActionController::Base.helpers.image_url("default/#{name}.png")
  end
end
