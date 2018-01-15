# frozen_string_literal: true

ActiveAdmin.register User do
  menu priority: 2

  filter :company

  permit_params do
    permitted = [:company_id, :name, :gender, :password, :password_confirmation, :email,
                 :role, :avatar, :owner, :language, user_permissions_attributes: [:permission_id]]
    if %w[create update].include?(params[:action])
      params[:user][:user_permissions_attributes] = Permission.select(:id)
                                                              .where('role <= ?', User.roles[params[:user][:role]])
                                                              .map { |p| { permission_id: p.id } }
    end
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
      row :role
      row :gender
      row :owner
      row :language
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'Company' do
      f.input :avatar, as: :file, hint: image_tag(f.object.try(:avatar_url), id: 'user-avatar-image', class: 'image-uploader')
      f.input :name
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :company
      f.input :role
      f.input :gender
      f.input :owner
      f.input :language, as: :select, collection: languages
    end
    f.actions
  end

  controller do
    helper ActiveAdminHelper

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
