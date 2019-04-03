# frozen_string_literal: true

ActiveAdmin.register User do
  menu priority: 2

  filter :company

  permit_params do
    permitted = %i[company_id name gender password password_confirmation email role avatar owner language]
    permitted
  end

  member_action :send_notification, method: %i[get post] do
    if request.post?
      firebase = FCM.new(ENV['SERVER_KEY'])
      body     = { notification: { title: noti_params[:title], body: noti_params[:message] } }
      response = firebase.send(noti_params[:token], body)

      redirect_to admin_user_path(params[:id]), notice: 'send notification success'
    else
      @user = User.find(params[:id])
      render :send_notification
    end
  end

  action_item :view, only: :show do
    link_to 'Send Notification', send_notification_admin_user_path(resource) if resource.device_tokens.count > 0
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
      row :device_tokens do |user|
        user.device_tokens.pluck(:device_token).join(', ')
      end
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

    def noti_params
      params.require(:send).permit(:token, :title, :message)
    end
  end
end
