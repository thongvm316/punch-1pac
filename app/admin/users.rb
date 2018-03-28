# frozen_string_literal: true

ActiveAdmin.register User do
  menu priority: 2

  filter :company

  permit_params do
    permitted = %i[company_id name gender password password_confirmation email role avatar owner language]
    permitted
  end

  index do
    selectable_column
    column :avatar do |user|
      image_tag(user.avatar_url, style: 'width: 50px')
    end
    column :name
    column :email
    column :company
    column :role
    column :gender
    actions
  end

  show do
    attributes_table do
      row :avatar do |user|
        image_tag(user.avatar_url, style: 'width: 50px')
      end
      row :name
      row :email
      row :company
      row :groups do |user|
        user.groups.pluck(:name).join(', ')
      end
      row :role
      row :gender
      row :owner
      row :language
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'User' do
      f.input :avatar, as: :file, hint: image_tag(f.object.try(:avatar_url), id: 'user-avatar-image', class: 'image-uploader')
      f.input :name
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :company
      f.input :groups
      f.input :role
      f.input :gender
      f.input :owner
      f.input :language, as: :select, collection: I18n.available_locales
    end
    f.actions
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
