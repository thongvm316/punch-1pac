export const usersData = () => {
  return {
    users: [
      {
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
      {
        activated: true,
        activated_at: '2020-01-01',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        created_at: '2020-01-01',
        deactivated_at: null,
        email: 'example@1pac.vn',
        gender: 'male',
        id: 2,
        language: 'en',
        name: 'Clara',
        owner: true,
        password_changed: false,
        position: 'Backend Developer',
        role: 'superadmin'
      },
      {
        activated: true,
        activated_at: '2020-01-01',
        avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
        created_at: '2020-01-01',
        deactivated_at: null,
        email: 'abc@1pac.vn',
        gender: 'male',
        id: 3,
        language: 'en',
        name: 'Clara Abc',
        owner: true,
        password_changed: false,
        position: 'Backend Developer',
        role: 'admin'
      }
    ]
  }
}
