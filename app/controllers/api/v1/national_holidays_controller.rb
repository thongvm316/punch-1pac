# frozen_string_literal: true

class Api::V1::NationalHolidaysController < Api::V1::BaseController
  def index
    authorize!
    national_holidays = NationalHoliday.where(country: params[:country])
    render json: national_holidays, each_serializer: HolidaySerializer, status: 200
  end

  # def import
  #   authorize!
  #   available_holidays = NationalHoliday.where(id: params[:national_holiday_ids])
  #   holidays = available_holidays.map do |holiday|
  #     {
  #       company_id: current_company.id,
  #       started_at: holiday.started_at,
  #       ended_at:   holiday.ended_at,
  #       name:       holiday.name
  #     }
  #   end
  #   Holiday.import(holidays)
  #   render json: holidays, each_serializer: HolidaySerializer, status: 201
  # end
  #
  # def company_destroy
  #   authorize!
  #   # CompanyHoliday.where(company_id: current_company.id).where(holiday_id: params[:holiday_ids]).delete_all
  #   # national_holidays = current_company.holidays
  #   render json: [], each_serializer: HolidaySerializer, status: 200
  # end
end
