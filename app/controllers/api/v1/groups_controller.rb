# frozen_string_literal: true

class Api::V1::GroupsController < Api::V1::BaseController
  before_action :set_group, only: %i[show update destroy add_user remove_user report personal_report]

  def index
    authorize!
    groups = current_company.groups.for_user(current_user).order(name: :asc)
    render json: groups, each_serializer: GroupSerializer, status: :ok if stale?(groups)
  end

  def show
    authorize! @group
    render json: @group, serializer: GroupSerializer, status: :ok if stale?(@group)
  end

  def create
    authorize!
    group = current_company.groups.build(group_params)
    if group.save
      render json: group, serializer: GroupSerializer, status: :created
    else
      render_422(group.errors.messages)
    end
  end

  def update
    authorize! @group
    if @group.update(group_params)
      render json: @group, serializer: GroupSerializer, status: :ok
    else
      render_422(@group.errors.messages)
    end
  end

  def destroy
    authorize!
    @group.destroy
    head 200
  end

  def add_user
    user = User.find(params[:user_id])
    authorize! @group
    user_group = UserGroup.new(group: @group, user: user)
    if user_group.save
      head(200)
    else
      render_422(user_group.errors.messages)
    end
  end

  def remove_user
    user = User.unscope(where: :activated).find(params[:user_id])
    authorize! @group
    user_group = UserGroup.find_by!(group: @group, user: user)
    user_group.destroy
    head(200)
  end

  def report
    authorize! @group
    results = current_company.users.report(params.merge(group_id: params[:id])).order(name: :asc)
    respond_to do |format|
      format.json do
        render  json: results,
                root: 'results',
                each_serializer: GroupReportSerializer,
                meta: {
                  company_total_working_hours_on_month: current_company.total_working_hours_on_month(params[:date], params[:date_type]),
                  company_total_working_days_in_month: current_company.total_working_days_in_month(params[:date], params[:date_type])
                },
                params: params,
                adapter: :json,
                status: :ok
      end
      format.csv { send_data(Group.report_csv(results), type: 'text/csv; charset=utf-8; header=present', filename: 'report.csv', disposition: 'attachment') }
    end
  end

  def personal_report
    authorize! @group
    user = @group.users.find(params[:user_id])
    if user
      attendances = user.attendances.in_period(params[:day]).order(day: :asc)
      report = @group.users.where(id: params[:user_id]).report(params.merge(group_id: params[:id])).order(name: :asc)
      holidays = current_company.holidays.in_month(params[:day])

      attendances_json = ActiveModelSerializers::SerializableResource.new(attendances, each_serializer: AttendanceSerializer).as_json
      report_json = ActiveModelSerializers::SerializableResource.new(report, each_serializer: GroupReportSerializer, params: params).as_json
      holidays_json = ActiveModelSerializers::SerializableResource.new(holidays, each_serializer: HolidaySerializer).as_json

      render json: { attendances: attendances_json, holidays: holidays_json, report: report_json }, status: :ok
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :image, :description)
  end

  def set_group
    @group = current_company.groups.find(params[:id])
  end
end
