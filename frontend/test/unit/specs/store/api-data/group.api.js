export const groupData = () => ({
  id: 1,
  name: 'default',
  image_url: 'http://localhost:3000/static/default/group_image-3e415f88351076bbfdeb11dc83858658a480b1fb1a4965a9082934929cf2d664.png',
  description: 'quia',
  users_count: 11
})

export const anotherGroupData = () => ({
  id: 2,
  name: 'mocking',
  image_url: 'http://localhost:3000/static/default/group_image-3e415f88351076bbfdeb11dc83858658a480b1fb1a4965a9082934929cf2d664.png',
  description: 'quia',
  users_count: 11
})

export const usersInGroupData = () => ({
  users: [
    {
      id: 1,
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
    {
      id: 2,
      email: 'jeffery@mclaughlin.org',
      name: 'John Kenedy',
      avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
      gender: 'male',
      position: 'Backend Developer',
      owner: false,
      role: 'member',
      language: 'en',
      password_changed: false,
      activated: false,
      activated_at: '2020-01-08',
      deactivated_at: null,
      created_at: '2020-01-08'
    },
    {
      id: 3,
      email: 'hubert@ferry.io',
      name: 'Mocking Bird',
      avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
      gender: 'male',
      position: 'Backend Developer',
      owner: false,
      role: 'member',
      language: 'en',
      password_changed: false,
      activated: true,
      activated_at: '2020-01-08',
      deactivated_at: null,
      created_at: '2020-01-08'
    }
  ],
  meta: {
    current_page: 1,
    next_page: null,
    prev_page: null,
    per_page: 1000,
    total_pages: 1
  }
})

export const userData = () => ({
  id: 11,
  email: 'hubert@ferry.io',
  name: 'Cooper',
  avatar_url: 'http://localhost:3000/static/default/user_avatar-751fbd8e7c012f38bb132002fc9d7fab3461c512847921987c2fab06e376b263.png',
  gender: 'male',
  position: 'Backend Developer',
  owner: false,
  role: 'member',
  language: 'en',
  password_changed: false,
  activated: true,
  activated_at: '2020-01-08',
  deactivated_at: null,
  created_at: '2020-01-08'
})

export const groupError = () => ({
  status: 422,
  data: {
    message: 'Unprocessable Entity',
    errors: {
      name: [ 'can\'t be blank' ]
    }
  }
})
