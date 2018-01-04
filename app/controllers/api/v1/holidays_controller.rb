# frozen_string_literal: true

class Api::V1::HolidaysController < Api::V1::BaseController
  def index
    authorize Holiday
    system_holidays = Holiday.where(country: params[:country])
    render json: system_holidays, each_serializer: HolidaySerializer, status: 200
  end

  def import
    authorize Holiday
    available_holidays = Holiday.available_for_company(current_company.id, params[:system_holiday_ids])
    holidays = available_holidays.map do |holiday|
      { company_id: current_company.id, holiday_id: holiday.id }
    end
    CompanyHoliday.import(holidays)
    render json: available_holidays, each_serializer: HolidaySerializer, status: 201
  end

  def company_destroy
    authorize Holiday
    CompanyHoliday.where(company_id: current_company.id).where(holiday_id: params[:holiday_ids]).delete_all
    system_holidays = current_company.holidays
    render json: system_holidays, each_serializer: HolidaySerializer, status: 200
  end
end