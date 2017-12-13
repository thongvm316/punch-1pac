# frozen_string_literal: true

class V1::DepartmentsController < ApplicationController
  before_action :set_department, only: %i[show update destroy]

  def index
    departments = current_company.departments
    render json: departments, each_serializer: DepartmentSerializer, status: 200
  end

  def show
    render json: @department, serializer: DepartmentSerializer, status: 200
  end

  def update
    if @department.update_attributes(department_params)
      render json: @department, serializer: DepartmentSerializer, status: 200
    else
      render_422(@department.errors.messages)
    end
  end

  def create
    department = current_company.departments.build(department_params)
    if department.save
      render json: department, serializer: DepartmentSerializer, status: 201
    else
      render_422(department.errors.messages)
    end
  end

  def destroy
    @department.destroy
    head(200)
  end

  private

  def set_department
    @department = current_company.departments.find(params[:id])
  end

  def department_params
    params.require(:department).permit(:name)
  end
end
