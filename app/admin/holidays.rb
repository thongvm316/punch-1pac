# frozen_string_literal: true

ActiveAdmin.register Holiday do
  permit_params do
    permitted = %i[name country started_at ended_at admin_id]
    if params[:action] == 'create'
      params[:holiday][:admin_id] = current_admin.id
    end
    permitted
  end
  menu priority: 3

  filter :country
  filter :started_at
  filter :ended_at

  index do
    selectable_column
    column :name
    column :country
    column :started_at
    column :ended_at
    actions
  end

  form do |f|
    f.inputs 'Holiday' do
      f.input :name
      f.input :country, as: :select, collection: countries
      f.input :started_at, as: :datepicker
      f.input :ended_at, as: :datepicker
    end
    f.actions
  end
  controller { helper ActiveAdminHelper }
end
