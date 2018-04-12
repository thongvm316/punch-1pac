# frozen_string_literal: true

class Api::V1::HolidaysController < Api::V1::BaseController
  before_action :set_holiday, only: %i[update destroy]

  def index
    authorize!
    holidays = current_company.holidays.order(id: :asc)
    render json: holidays, each_serializer: HolidaySerializer, status: 200
  end

  def import
    authorize!
    national_holidays = NationalHoliday.selected_attr.where(country: params[:country]).where.not(id: Holiday.national_holiday_ids(current_company.id))
    return head(404) if national_holidays.blank?
    holidays = current_company.holidays.build(national_holidays.map(&:attributes))
    Holiday.import(holidays)
    render json: holidays, each_serializer: HolidaySerializer, status: 200
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
    if @holiday.update(holiday_params)
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

  def set_holiday
    @holiday = current_company.holidays.find(params[:id])
  end
end
