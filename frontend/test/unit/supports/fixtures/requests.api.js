export default {
  requests: [
    {
      id: 1,
      reason: 'Veritatis voluptas nihil. Sequi ullam quod. Enim ut suscipit.',
      attendance_day: '2020-02-07',
      attended_at: '10:48',
      left_at: '10:48',
      status: 'approved',
      updated_at: '2020-01-08T10:48:35+07:00',
      admin_reason: null,
      kind: 'attendance',
      user: {
        id: 2,
        email: 'example@1pac.vn',
        name: 'John Kenedy',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        gender: 'male',
        position: 'Backend Developer',
        owner: false,
        role: 'superadmin',
        language: 'en',
        password_changed: false,
        activated: true,
        activated_at: '2020-01-01',
        deactivated_at: null,
        created_at: '2020-01-01'
      }
    },
    {
      id: 2,
      reason: 'Sequi beatae aut. In tempore saepe. Fugit eveniet quaerat.',
      attendance_day: '2020-02-06',
      attended_at: '10:48',
      left_at: '10:48',
      status: 'rejected',
      updated_at: '2020-01-08T10:48:35+07:00',
      admin_reason: 'admin_reason',
      kind: 'attendance',
      user: {
        id: 1,
        email: 'wofi.minh@1pac.vn',
        name: 'John Kenedy',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        gender: 'male',
        position: 'Backend Developer',
        owner: false,
        role: 'member',
        language: 'en',
        password_changed: false,
        activated: true,
        activated_at: '2020-01-01',
        deactivated_at: null,
        created_at: '2020-01-01'
      }
    },
    {
      id: 3,
      reason: 'Aliquam aut dolorum. Quisquam et dolorem. Doloremque expedita ut.',
      attendance_day: '2020-02-05',
      attended_at: '10:48',
      left_at: '10:48',
      status: 'rejected',
      updated_at: '2020-01-08T10:48:35+07:00',
      admin_reason: 'admin_reason',
      kind: 'attendance',
      user: {
        id: 1,
        email: 'wofi.minh@1pac.vn',
        name: 'John Kenedy',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        gender: 'male',
        position: 'Backend Developer',
        owner: false,
        role: 'member',
        language: 'en',
        password_changed: false,
        activated: true,
        activated_at: '2020-01-01',
        deactivated_at: null,
        created_at: '2020-01-01'
      }
    }
  ],

  request: {
    id: 4,
    reason: 'Veritatis voluptas nihil. Sequi ullam quod. Enim ut suscipit.',
    attendance_day: '2020-02-07',
    attended_at: '10:48',
    left_at: '10:48',
    status: 'approved',
    updated_at: '2020-01-08T10:48:35+07:00',
    admin_reason: null,
    kind: 'attendance',
    user: {
      id: 2,
      email: 'example@1pac.vn',
      name: 'John Kenedy',
      avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
      gender: 'male',
      position: 'Backend Developer',
      owner: false,
      role: 'superadmin',
      language: 'en',
      password_changed: false,
      activated: true,
      activated_at: '2020-01-01',
      deactivated_at: null,
      created_at: '2020-01-01'
    },
    admin: {
      id: 1,
      email: 'wofi.minh@1pac.vn',
      name: 'John Kenedy',
      avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
      gender: 'male',
      position: 'Backend Developer',
      owner: false,
      role: 'member',
      language: 'en',
      password_changed: false,
      activated: true,
      activated_at: '2020-01-01',
      deactivated_at: null,
      created_at: '2020-01-01'
    }
  },

  requestUpdate: {
    id: 1,
    reason: 'hummingbird',
    attendance_day: '2020-02-07',
    attended_at: '10:48',
    left_at: '10:48',
    status: 'approved',
    updated_at: '2020-01-08T10:48:35+07:00',
    admin_reason: null,
    kind: 'attendance',
    user: {
      id: 2,
      email: 'example@1pac.vn',
      name: 'John Kenedy',
      avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
      gender: 'male',
      position: 'Backend Developer',
      owner: false,
      role: 'superadmin',
      language: 'en',
      password_changed: false,
      activated: true,
      activated_at: '2020-01-01',
      deactivated_at: null,
      created_at: '2020-01-01'
    }
  },

  meta: {
    current_page: 1,
    next_page: 2,
    prev_page: null,
    per_page: 20,
    total_pages: 4
  },

  errors: {
    name: 'has been taken'
  }
}
