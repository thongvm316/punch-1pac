export default {
  currentUser: {
    activated: false,
    activated_at: '2020-01-01',
    avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
    created_at: '2020-01-01',
    deactivated_at: null,
    email: 'wofi.minh@1pac.vn',
    gender: 'male',
    id: 1,
    language: 'en',
    name: 'John Kenedy',
    owner: false,
    password_changed: false,
    position: 'Backend Developer',
    role: 'member'
  },

  currentCompany: {
    address: '27755 Janis Village',
    country: 'French Guiana',
    id: 1,
    industry: 'startup',
    logo_url: '/static/logo.png',
    name: 'April Simonis',
    namespace: 'namespace_1',
    phone_number: '1-469-970-9015',
    postal_code: '44596',
    tax_code: 'Ww534703Rg7f43',
    timezone: 'Asia/Bangkok',
    breakdays: ['saturday', 'sunday'],
  },

  meta: {
    base_url: 'http://localhost:3000',
    csv_template_url: '/public/static/template.csv',
    languages: ['en', 'vi', 'ja'],
    attendance_statuses: ['attend_ok', 'attend_late', 'leave_ok', 'leave_early', 'annual_leave'],
    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    roles: ['member', 'admin', 'superadmin']
  },

  errors: {
    name: 'error'
  }
}
