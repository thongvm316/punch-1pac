# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :current_company

  def index
    attendance = current_user.attendances.find_by(day: Time.current)

    @initial_state = {
      attendance: attendance ? ActiveModelSerializers::SerializableResource.new(attendance, serializer: AttendanceSerializer).as_json : {},
      user: ActiveModelSerializers::SerializableResource.new(current_user, serializer: CompanySerializer).as_json,
      company: ActiveModelSerializers::SerializableResource.new(current_company, serializer: CompanySerializer).as_json,
      meta: {
        attendanceStatuses: [].concat(Attendance::ATTENDING_STATUSES).concat(Attendance::LEAVING_STATUSES).concat(Attendance::OFF_STATUSES),
        requestStatuses: Request.statuses.keys,
        languages: I18n.available_locales.map(&:to_s),
        weekdays: BusinessDay::WEEKDAYS,
        holiday_countries: Holiday::COUNTRIES,
        timezones: ActiveSupport::TimeZone.all.map { |tz| tz.tzinfo.name }.uniq,
        roles: User.roles.keys,
        industries: Company::INDUSTRIES
      }
    }
    @webpack_assets = Oj.load_file(Rails.root.join('public', 'app', '_webpack-assets-nxu54TIPbpRWzks8.json').to_s)
  end
end
