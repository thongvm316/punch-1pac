# frozen_string_literal: true

ActiveAdmin.register NationalHoliday do
  permit_params do
    permitted = %i[name country started_at ended_at admin_id]
    params[:national_holiday][:admin_id] = current_admin.id if params[:action] == 'create'
    permitted
  end
  menu priority: 3

  filter :country
  filter :started_at
  filter :ended_at

  collection_action :import_csv, method: :post do
    return redirect_to import_csv_form_admin_national_holidays_path, flash: { error: 'CSV invalid file!' } unless params[:file]

    c_params = { country: params[:file].original_filename.split('.')[0], admin_id: current_admin.id }
    holidays = []
    CSV.foreach(params[:file].tempfile, headers: true) do |row|
      holidays << row.to_hash.merge(c_params)
    end
    NationalHoliday.import holidays
    redirect_to admin_national_holidays_path, notice: 'CSV imported successfully!'
  end

  collection_action :import_csv_form, method: :get do
  end

  action_item :view, only: :index do
    link_to 'Import Csv', import_csv_form_admin_national_holidays_path
  end

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
      f.input :country, as: :select, collection: NationalHoliday::COUNTRIES
      f.input :started_at, as: :datepicker
      f.input :ended_at, as: :datepicker
    end
    f.actions
  end
end
