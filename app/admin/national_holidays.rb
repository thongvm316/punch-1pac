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

  collection_action :import_csv, method: %i[get post] do
    @national_holiday = NationalHoliday.new
    if request.post?
      @national_holiday.errors.messages[:file] = 'File cannot be blank' if params[:national_holiday][:file].blank?
      @national_holiday.errors.messages[:country] = 'Country cannot be blank' if params[:national_holiday][:country].blank?

      if @national_holiday.errors.messages.blank?
        holidays = []
        CSV.foreach(params[:national_holiday][:file].tempfile, headers: true) do |row|
          holidays << row.to_hash.merge(country: params[:national_holiday][:country], admin_id: current_admin.id)
        end
        NationalHoliday.import holidays
        redirect_to admin_national_holidays_path, notice: 'CSV imported successfully!'
      else
        render :import_csv
      end
    else
      render :import_csv
    end
  end

  action_item :view, only: :index do
    link_to 'Import CSV', import_csv_admin_national_holidays_path
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
