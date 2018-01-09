# frozen_string_literal: true

class Api::V1::CompaniesController < Api::V1::BaseController
  def update
    authorize Company
    if current_company.update_attributes(company_params)
      render json: current_company, serializer: CompanySerializer, status: 200
    else
      render_422(current_company.errors.messages)
    end
  end

  def setup_rules
    authorize Company
    if current_company.update_attributes(company_rule_params)
      render json: current_company, serializer: CompanySerializer, status: 200
    else
      render_422(current_company.errors.messages)
    end
  end

  def deactivate
    authorize Company
    current_company.update_attributes(activated: false)
    head(200)
  end

  def destroy
    authorize Company
    current_company.destroy
    head(200)
  end

  private

  def company_params
    params.require(:company).permit(:name, :country, :industry, :address, :phone_number, :postal_code, :tax_code, :logo)
  end

  def company_rule_params
    params.require(:company).permit(:timezone, :breaktime, :breakdays)
  end
end
