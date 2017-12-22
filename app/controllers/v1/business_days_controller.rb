# frozen_string_literal: true

class V1::BusinessDaysController < ApplicationController
  before_action :set_business_day, only: %i[update destroy]

  def index
    business_days = current_company.business_days
    render json: business_days, each_serializer: BusinessDaySerializer, status: 200
  end

  def create
    business_day = current_company.business_days.build(business_day_params)
    if business_day.save
      render json: business_day, serializer: BusinessDaySerializer, status: 201
    else
      render_422(business_day.errors.messages)
    end
  end

  def update
    if @business_day.update_attributes(business_day_params)
      render json: @business_day, serializer: BusinessDaySerializer, status: 200
    else
      render_422(@business_day.errors.messages)
    end
  end

  def destroy
    @business_day.destroy
    head(200)
  end

  private

  def business_day_params
    params.require(:business_day).permit(:started_at, :ended_at, :weekday)
  end

  def set_business_day
    @business_day = current_company.business_days.find(params[:id])
  end
end