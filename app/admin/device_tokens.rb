# frozen_string_literal: true

ActiveAdmin.register DeviceToken do
  index do
    selectable_column
    column :device_token
    column :device_type
    column :user
    actions
  end

  controller do
    around_action :skip_bullet, if: -> { Rails.env.development? }

    private

    def skip_bullet
      Bullet.enable = false
      yield
    ensure
      Bullet.enable = true
    end
  end
end
