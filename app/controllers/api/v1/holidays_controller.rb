# frozen_string_literal: true

class Api::V1::HolidaysController < Api::V1::BaseController
  before_action :set_holiday, only: %i[update destroy]

  def index
    authorize!
    holidays = current_company.holidays.filter(params[:name])
    render json: holidays, each_serializer: HolidaySerializer, status: 200
  end

  def import
    authorize!
    holidays = current_company.holidays.build(holidays_params[:holidays])

    head(400) && return unless holidays.present? && holidays_params[:holidays].present?

    result = Holiday.import(holidays)
    render json: Holiday.where(id: result.ids), each_serializer: HolidaySerializer, status: 200
  end

  def create
    authorize!
    holiday = current_company.holidays.build(holiday_params)
    if holiday.save
      render json: holiday, serializer: HolidaySerializer, status: 201
    else
      render_422(holiday.errors.messages)
    end
  end

  def update
    authorize!
    if @holiday.update_attributes(holiday_params)
      render json: @holiday, serializer: HolidaySerializer, status: 200
    else
      render_422(@holiday.errors.messages)
    end
  end

  def destroy
    authorize!
    @holiday.destroy
    head(200)
  end

  private

  def holiday_params
    params.require(:holiday).permit(:started_at, :ended_at, :name)
  end

  def holidays_params
    params.permit(holidays: %i[ended_at name started_at])
  end

  def set_holiday
    @holiday = Holiday.find(params[:id])
  end
end
