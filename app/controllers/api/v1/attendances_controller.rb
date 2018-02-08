# frozen_string_literal: true

class Api::V1::AttendancesController < Api::V1::BaseController
  include Pagination

  def create
    authorize!
    attendance = AttendanceService.new(current_user).attend
    if attendance
      render json: attendance, serializer: AttendanceSerializer, status: 201
    else
      head(200)
    end
  end

  def chart
    attendances = current_user.attendances.status_count_each_month(params[:status])
    render json: attendances, each_serializer: AttendanceChartSerializer, status: 200
  end

  def index
    attendances = Attendance.for_user(current_user, params['self'])
                            .search_by(params)
                            .page(params[:page])
                            .per(params[:per_page])
                            .order(day: :desc)
    render json: attendances,
           root: 'attendances',
           each_serializer: AttendanceSerializer,
           adapter: :json,
           meta: pager(attendances)
  end

  def calendar
    attendances = current_user.attendances.calendar(params[:day]).order(day: :asc)
    render json: attendances,
           each_serializer: AttendanceSerializer,
           status: 200
  end

  def update
    authorize!
    attendance = AttendanceService.new(current_user).leave
    render json: attendance, serializer: AttendanceSerializer, status: 200
  end
end
