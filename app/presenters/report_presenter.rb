# frozen_string_literal: true

class ReportPresenter
  def initialize(company, params = {})
    @company = company
    @params  = params
    @group   = @company.groups.find(params[:id])
  end

  def statific_company_in_month
    UserPresenter.statific_status_in_month(@group, @params)
  end

  def statific_personal_in_month(user)
    UserPresenter.statific_single_status_in_month(user, @params)
  end

  def user_attendances_in_month(user)
    AttendPresenter.new(user, @params).in_month
  end
end
