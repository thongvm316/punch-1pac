# frozen_string_literal: true

class Api::V1::AttendancesController < Api::V1::BaseController
  include Pagination

  def create
    authorize!
    attendance = AttendanceService.new(current_user, request.remote_ip).attend
    if attendance
      TrackAndNotifyActivityWorker.perform_async(current_user.id, attendance.id, attendance.class.to_s, 'punch_in')
      render json: attendance, serializer: AttendanceSerializer, status: :created
    else
      head(200)
    end
  end

  def today
    authorize!
    attendance = current_user.attendances.find_by(day: Time.current)
    attendance ? render(json: attendance, serializer: AttendanceSerializer, status: :ok) : head(:ok)
  end

  def chart
    authorize!
    render json: current_user.attendances.chart(params[:date]).first.as_json(except: %i[id]), status: :ok
  end

  def index
    authorize!
    attendances = Attendance.for_user(current_user, params['self'])
                            .search_by(params)
                            .page(params[:page])
                            .per(params[:per_page])
                            .order(day: :desc)
    render json: attendances,
           root: 'attendances',
           each_serializer: AttendanceSerializer,
           adapter: :json,
           meta: pager(attendances),
           status: :ok
  end

  def calendar
    authorize!
    attendances = current_user.attendances.calendar(params[:day]).order(day: :asc)
    render json: attendances,
           root: 'attendances',
           meta: ActiveModelSerializers::SerializableResource.new(current_company.holidays.in_month(params[:day]), each_serializer: HolidaySerializer).as_json,
           meta_key: 'holidays',
           each_serializer: AttendanceSerializer,
           adapter: :json,
           status: :ok
  end

  def update
    authorize!
    attendance = AttendanceService.new(current_user, request.remote_ip).leave
    TrackAndNotifyActivityWorker.perform_async(current_user.id, attendance.id, attendance.class.to_s, 'punch_out') if attendance
    render json: attendance, serializer: AttendanceSerializer, status: :ok
  end
end
