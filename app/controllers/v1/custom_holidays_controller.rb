# frozen_string_literal: true

class V1::CustomHolidaysController < ApplicationController
  before_action :set_holiday, only: %i[update destroy]

  def index
    holidays = current_company.custom_holidays
    render json: holidays, each_serializer: HolidaySerializer, status: 200
  end

  def create
    holiday = current_company.custom_holidays.build(holiday_params)
    if holiday.save
      render json: holiday, serializer: HolidaySerializer, status: 201
    else
      render_422(holiday.errors.messages)
    end
  end

  def update
    if @holiday.update_attributes(holiday_params)
      render json: @holiday, serializer: HolidaySerializer, status: 200
    else
      render_422(@holiday.errors.messages)
    end
  end

  def destroy
    @holiday.destroy
    head(200)
  end

  private

  def holiday_params
    params.require(:holiday).permit(:started_at, :ended_at, :name)
  end

  def set_holiday
    @holiday = CustomHoliday.find(params[:id])
  end
end
