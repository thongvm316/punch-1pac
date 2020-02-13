# frozen_string_literal: true

class CompanySerializer < ApplicationSerializer
  attributes :id, :namespace, :name, :country, :industry, :address, :phone_number, :postal_code, :tax_code, :activated,
             :timezone, :logo_url, :breakdays, :punch_method, :monthly_report

  def logo_url
    ActionController::Base.helpers.asset_url(object.logo_url)
  end

  delegate :breakdays, to: :object
end
