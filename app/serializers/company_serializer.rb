# frozen_string_literal: true

class CompanySerializer < ApplicationSerializer
  attributes :id, :namespace, :name, :country, :industry, :address, :phone_number, :postal_code, :tax_code, :activated,
             :timezone, :breaktime, :breakdays
end
