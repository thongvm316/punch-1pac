# frozen_string_literal: true

class Api::V1::AttendancesController < Api::V1::BaseController
  include Pagination
  before_action :set_user, only: %i[create update]

  def create
    authorize! @user
    attendance = AttendanceService.new(@user, request.remote_ip).attend
    if attendance
      body = { notification: { title: 'attendance', body: 'punch in' } }
      TrackAndNotifyActivityWorker.perform_async(current_user.id, attendance.id, attendance.class.to_s, 'punch_in')
      PushNotificationService.new(current_user.id, body).execute
      render json: attendance, serializer: AttendanceSerializer, status: :created
    else
      head(200)
    end
  end

  def today
    authorize!
    attendance = current_user.attendances.find_by(day: Time.current)
    if attendance
      attendance_json = ActiveModelSerializers::SerializableResource.new(attendance, serializer: AttendanceSerializer).as_json
      company_json    = ActiveModelSerializers::SerializableResource.new(current_company, serializer: CompanySerializer).as_json
      render json: { attendance: attendance_json, company: company_json }, status: :ok
    else
      head(:ok)
    end
  end

  def chart
    authorize!

    attend = AttendPresenter.new(current_user, params)
    render json: attend.chart.first,
           root: 'statuses',
           serializer: AttendanceChartSerializer,
           meta: {
             company_total_working_hours_on_month: attend.total_working_hours_on_month,
             company_total_working_days_in_month:  attend.total_working_days_in_month
           },
           leave_days: attend.forget_punch_in,
           adapter: :json,
           status:  :ok
  end

  def index
    authorize!
    relation    = Attendance.for_user(current_user, params['self'])
    attendances = AttendanceQuery.new(relation, params).search_by

    if stale?(attendances)
      render json: attendances,
             root: 'attendances',
             each_serializer: AttendanceSerializer,
             adapter: :json,
             meta: pager(attendances).merge(forgot_punch_in_days: ForgotPunchInDaysService.new(current_user, current_company, params[:date]).execute),
             status: :ok
    end
  end

  def calendar
    authorize!
    attend = AttendPresenter.new(current_user, params).in_month
    if stale?(attend)
      render json: attend,
             root: 'attendances',
             meta: ActiveModelSerializers::SerializableResource.new(current_company.holidays.in_month(params[:day]), each_serializer: HolidaySerializer).as_json,
             meta_key: 'holidays',
             each_serializer: AttendanceSerializer,
             adapter: :json,
             status: :ok
    end
  end

  def update
    authorize! @user
    attendance = AttendanceService.new(@user, request.remote_ip).leave
    body       = { notification: { title: 'attendance', body: 'punch out' } }
    TrackAndNotifyActivityWorker.perform_async(current_user.id, attendance.id, attendance.class.to_s, 'punch_out') if attendance
    PushNotificationService.new(current_user.id, body).execute
    render json: attendance, serializer: AttendanceSerializer, status: :ok
  end

  private

  def set_user
    @user = current_company.users.find(params[:user_id])
  end
end
