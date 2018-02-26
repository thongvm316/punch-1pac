# frozen_string_literal: true

class Api::V1::NationalHolidaysController < Api::V1::BaseController
  def index
    authorize!
    national_holidays = NationalHoliday.where(country: params[:country])
    render json: national_holidays, each_serializer: HolidaySerializer, status: 200
  end
end
