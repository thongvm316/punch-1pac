# frozen_string_literal: true

company = FactoryBot.create(:company)
user = FactoryBot.create(:user, email: 'wofi.minh@1pac.vn', password: 'password', password_confirmation: 'password', company: company, created_at: Time.current.beginning_of_year)
superadmin = FactoryBot.create(:user, email: 'example@1pac.vn', password: 'password', password_confirmation: 'password', company: company, role: 'superadmin', created_at: Time.current.beginning_of_year)

%w[monday tuesday wednesday thursday friday].each { |day| FactoryBot.create(:business_day, weekday: day, morning_started_at: '08:00', morning_ended_at: '12:00', afternoon_started_at: '13:30', afternoon_ended_at: '17:30', company: company) }
FactoryBot.create(:allowed_ip, ip_address: '127.0.0.1', company: company)
FactoryBot.create_list(:allowed_ip, 3, company: company)
FactoryBot.create_list(:session, 4, user: superadmin, device_type: %w[desktop smartphone tablet][rand(3)])

5.times do
  FactoryBot.create_list(:user, 3, company: FactoryBot.create(:company))
end

admin = FactoryBot.create(:admin, email: 'admin@example.com', password: 'password')

FactoryBot.create_list(:national_holiday, 20, country: %w[vietnam japan][rand(2)], admin: admin)
# FactoryBot.create_list(:holiday, 10, company: Company.first)
FactoryBot.create_list(:announcement, 2, admin: admin)
FactoryBot.create(:group, name: Group::DEFAULT_NAME, company: company)
FactoryBot.create_list(:group, 5, company: company)
FactoryBot.create(:user_group, user: user, group: Group.last)
FactoryBot.create(:user_group, user: superadmin, group: Group.first)
FactoryBot.create(:user_group, user: superadmin, group: Group.last)

month        = Date.current - 1.month
prev_month   = month.beginning_of_month
month_in_now = Date.current

attend_ok   = Time.zone.local(2000, 1, 1, 8, 0, 0)
attend_late = Time.zone.local(2000, 1, 1, 9, 0, 0)
left_ok     = Time.zone.local(2000, 1, 1, 18, 0, 0)
left_early  = Time.zone.local(2000, 1, 1, 17, 0, 0)

attend_leave_ok       = { attending_status: 'attend_ok',   leaving_status: 'leave_ok',    attended_at: attend_ok,   left_at: left_ok }
attend_late_leave_ok  = { attending_status: 'attend_late', leaving_status: 'leave_ok',    attended_at: attend_late, left_at: left_ok }
attend_ok_leave_early = { attending_status: 'attend_ok',   leaving_status: 'leave_early', attended_at: attend_ok,   left_at: left_early }
attend_late_leave_ok  = { attending_status: 'attend_late', leaving_status: 'leave_early', attended_at: attend_late, left_at: left_early }

status = [attend_leave_ok, attend_late_leave_ok, attend_ok_leave_early, attend_late_leave_ok]

FactoryBot.create(:holiday, company: company, name: 'Tet Holiday', started_at: Date.parse('2020-1-23'), ended_at: Date.parse('2020-2-3'))

(prev_month..month_in_now).to_a.each do |day|
  hdays = company.holidays.range_date(prev_month, month_in_now)

  next if hdays.find { |holiday| day.between?(holiday.started_at, holiday.ended_at) }
  next unless company.business_days.find_by(weekday: day.strftime('%A').downcase)

  attributes       = status.sample
  working_hours    = CountWorkingHoursService.new(company, attributes[:attended_at], attributes[:left_at], day).execute
  mins_attend_late = TotalTimeOfLatency.new(company, attributes[:attended_at]).execute
  mins_leave_early = TotalTimeOfLatency.new(company, attributes[:left_at], true).execute
  total_times      = { working_hours: working_hours, minutes_attend_late: mins_attend_late, minutes_leave_early: mins_leave_early }

  FactoryBot.create(:attendance, day: day, user: [user, superadmin][rand(2)], **attributes, **total_times)
end
