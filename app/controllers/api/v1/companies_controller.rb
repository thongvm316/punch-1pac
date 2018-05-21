# frozen_string_literal: true

class Api::V1::CompaniesController < Api::V1::BaseController
  def update
    authorize!
    if current_company.update(company_params)
      render json: current_company, serializer: CompanySerializer, status: :ok
    else
      render_422(current_company.errors.messages)
    end
  end

  def deactivate
    authorize!
    current_company.update(activated: false)
    head(200)
  end

  def destroy
    authorize!
    current_company.destroy
    head(200)
  end

  private

  def company_params
    params.require(:company).permit(:name, :country, :industry, :address, :phone_number, :postal_code, :tax_code, :logo, :timezone, :app_blocked_by_ip)
  end
end
