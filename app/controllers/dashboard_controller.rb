# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :current_company

  def index
    attendance = current_user.attendances.find_by(day: Time.current)
    announcements = Announcement.for_user(current_user).search_by({ read_status: 'unread' }, current_user.id)

    @initial_state = {
      attendance: attendance ? ActiveModelSerializers::SerializableResource.new(attendance, serializer: AttendanceSerializer).as_json : {},
      user: ActiveModelSerializers::SerializableResource.new(current_user, serializer: UserSerializer).as_json,
      company: ActiveModelSerializers::SerializableResource.new(current_company, serializer: CompanySerializer).as_json,
      announcements: ActiveModelSerializers::SerializableResource.new(announcements, each_serializer: AnnouncementSerializer).as_json,
      meta: {
        attendance_statuses: [].concat(Attendance::ATTENDING_STATUSES).concat(Attendance::LEAVING_STATUSES).concat(Attendance::OFF_STATUSES),
        request_statuses: Request.statuses.keys,
        languages: I18n.available_locales.map(&:to_s),
        weekdays: BusinessDay::WEEKDAYS,
        holiday_countries: NationalHoliday::COUNTRIES,
        timezones: Company::TIMEZONES,
        roles: User.roles.keys,
        industries: Company::INDUSTRIES,
        csv_template_url: ActionController::Base.helpers.asset_url('template.csv')
      }
    }
    @webpack_assets = Oj.load_file(Rails.root.join('public', 'app', '_webpack-assets-nxu54TIPbpRWzks8.json').to_s)
  end
end
