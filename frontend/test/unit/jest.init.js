window.initialStates = function () {
  return {
    "attendance": {},
    "user": {
      "id":2,
      "email": "example@1pac.vn",
      "role": "superadmin",
      "owner": false,
      "name": "Clara Mayer",
      "gender": "male",
      "position": "Backend Developer",
      "language": "en",
      "password_changed": false,
      "avatar_url": "/static/avatar.png",
      "created_at": "2018-03-04",
      "activated": true,
      "deactivated_at": "2018-04-02",
      "activated_at": "2018-04-04",
      "groups": [],
      "forgot_punch_in_days_in_month": ['2018-05-07', '2018-05-08', '2018-06-20']
    },
    "company": {
      "id":1,
      "namespace":"namespace_1",
      "name":"April Simonis",
      "country":"French Guiana",
      "industry":"startup",
      "address":"27755 Janis Village",
      "phone_number":"1-469-970-9015",
      "postal_code":"44596",
      "tax_code":"Ww534703Rg7f43",
      "activated":true,
      "timezone":"Asia/Bangkok",
      "breaktime":1.0,
      "breakdays": ["saturday", "sunday"],
      "logo_url":"/static/logo.png"
    },
    "announcements": [],
    "meta": {
      "attendance_statuses": ["attend_ok", "attend_late", "leave_ok", "leave_early", "annual_leave"],
      "request_statuses": ["pending", "rejected", "approved"],
      "languages": ["en", "vi", "ja"],
      "weekdays": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      "holiday_countries": ["vietnam", "japan"],
      "timezones": ["Asia/Bangkok", "Asia/Tokyo", "Etc/UTC"],
      "roles": ["member", "admin", "superadmin"],
      "industries": ["hr_agency", "restaurant", "cafe_shop", "software_company", "startup", "interior_design"],
      "csv_template_url": "/public/static/template.csv",
      "base_url": "http://localhost:3000"
    }
  }
}
