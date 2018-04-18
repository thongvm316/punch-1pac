# frozen_string_literal: true

company = FactoryBot.create(:company)
user = FactoryBot.create(:user, email: 'wofi.minh@1pac.vn', password: 'password', password_confirmation: 'password', company: company, created_at: Time.current.beginning_of_year)
superadmin = FactoryBot.create(:user, email: 'example@1pac.vn', password: 'password', password_confirmation: 'password', company: company, role: 'superadmin', created_at: Time.current.beginning_of_year)

%w[monday tuesday wednesday thursday friday].each { |day| FactoryBot.create(:business_day, weekday: day, started_at: '01:00', ended_at: '10:30', company: company) }
FactoryBot.create(:allowed_ip, ip_address: '127.0.0.1', company: company)
FactoryBot.create_list(:allowed_ip, 3, company: company)
FactoryBot.create_list(:session, 4, user: superadmin, device_type: %w[desktop smartphone tablet][rand(3)])

5.times do
  FactoryBot.create_list(:user, 3, company: FactoryBot.create(:company))
end

admin = FactoryBot.create(:admin, email: 'admin@example.com', password: 'password')

FactoryBot.create_list(:national_holiday, 20, country: %w[vietnam japan][rand(2)], admin: admin)
FactoryBot.create_list(:holiday, 10, company: Company.first)
FactoryBot.create_list(:announcement, 2, admin: admin)
FactoryBot.create(:group, name: Group::DEFAULT_NAME, company: company)
FactoryBot.create_list(:group, 5, company: company)
FactoryBot.create(:user_group, user: user, group: Group.last)
FactoryBot.create(:user_group, user: superadmin, group: Group.first)
FactoryBot.create(:user_group, user: superadmin, group: Group.last)

prev_month = Time.current - 1.month
next_month = Time.current + 1.month
(prev_month.to_i..next_month.to_i).step(1.day) do |t|
  day = Time.zone.at(t)
  attendance = FactoryBot.create(:attendance, day: day, user: [user, superadmin][rand(2)])
  status = Request.statuses.keys[rand(3)]
  reason = status == 'rejected' ? 'admin_reason' : nil
  FactoryBot.create(:request, attendance: attendance, user: attendance.user, status: status, admin_id: user.id, admin_reason: reason)
end

10.times do
  user = FactoryBot.create(:user, company: company)
  FactoryBot.create(:user_group, user: user, group: Group.first)
end

(1..7).each do |month|
  next if (prev_month.month..next_month.month).cover?(month)
  (month % 3).times do |day|
    FactoryBot.create(:attendance, user: superadmin, attending_status: 'attend_ok', day: Date.new(Date.current.year, month, day + 1))
  end
end

(8..12).each do |month|
  next if (prev_month.month..next_month.month).cover?(month)
  (month % 3).times do |day|
    FactoryBot.create(:attendance, user: superadmin, attending_status: 'attend_late', day: Date.new(Date.current.year, month, day + 1))
  end
end
