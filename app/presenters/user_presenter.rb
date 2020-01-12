# frozen_string_literal: true

class UserPresenter
  def initialize(user = nil, params = {})
    @user   = user
    @params = params
  end

  def self.statific_status_in_month(company, params)
    @attendances = AttendanceQuery.new.relation
    company.users.select(
      :id, :name, :email, :avatar_data, :company_id, :created_at, :deactivated_at, :activated_at, :activated,
      "(#{@attendances.status_count_on_month('attend_ok',    'attending_status', params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('attend_late',  'attending_status', params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('leave_ok',     'leaving_status',   params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('leave_early',  'leaving_status',   params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.status_count_on_month('annual_leave', 'off_status',       params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})",
      "(#{@attendances.sum_working_hours_on_month(params[:date], params[:date_type]).where('attendances.user_id = users.id').to_sql})"
    )
  end

  def self.statific_single_status_in_month(user, params)
    @attend = AttendanceQuery.new(user.attendances).relation
    {
      attend_ok:     @attend.single_status_count_on_month('attend_ok',    'attending_status', params[:date], params[:date_type]),
      attend_late:   @attend.single_status_count_on_month('attend_late',  'attending_status', params[:date], params[:date_type]),
      leave_ok:      @attend.single_status_count_on_month('leave_ok',     'leaving_status',   params[:date], params[:date_type]),
      leave_early:   @attend.single_status_count_on_month('leave_early',  'leaving_status',   params[:date], params[:date_type]),
      leave:         @attend.single_status_count_on_month('annual_leave', 'off_status',       params[:date], params[:date_type]),
      working_hours: @attend.single_working_hours_on_month(params[:date], params[:date_type])
    }
  end
end
