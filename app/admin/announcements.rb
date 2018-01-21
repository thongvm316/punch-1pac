# frozen_string_literal: true

ActiveAdmin.register Announcement do
  menu priority: 4

  filter :title
  filter :target
  filter :sent

  permit_params do
    permitted = %i[title target sent content status admin_id]
    params[:announcement][:admin_id] = current_admin.id if params[:action] == 'create'
    permitted
  end

  index do
    selectable_column
    column :title
    column :status
    column :target
    column :sent
    column :content
    actions
  end
end
