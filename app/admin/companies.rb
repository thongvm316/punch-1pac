# frozen_string_literal: true

ActiveAdmin.register Company do
  permit_params do
    %i[name namespace timezone country industry address phone_number postal_code tax_code logo]
  end

  menu priority: 1
  filter :name

  index do
    selectable_column
    column :logo do |company|
      image_tag(company.logo_url, style: 'width: 50px')
    end
    column :namespace
    column :name
    column :country
    column :industry
    column :address
    column :phone_number
    column :postal_code
    column :tax_code
    column :activated
    column :timezone
    column :punch_method
    actions
  end

  show do
    attributes_table do
      row :logo do |user|
        image_tag(user.logo_url, style: 'width: 50px')
      end
      row :namespace
      row :name
      row :country
      row :industry
      row :address
      row :phone_number
      row :postal_code
      row :tax_code
      row :activated
      row :timezone
      row :punch_method
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'Company' do
      f.input :logo, as: :file, hint: image_tag(f.object.try(:logo_url), id: 'company-logo-image', class: 'image-uploader')
      f.input :namespace
      f.input :name
      f.input :country, as: :select, collection: NationalHoliday::COUNTRIES
      f.input :industry
      f.input :address
      f.input :phone_number
      f.input :postal_code
      f.input :tax_code
      f.input :timezone, as: :select, collection: Company::TIMEZONES
      f.input :punch_method
    end
    f.actions
  end
end
