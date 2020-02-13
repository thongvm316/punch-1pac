export const groupAttendancesData = () => {
  return {
    attendances: [
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-01',
        id: 0,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null,
        user: {
          name: 'Clara',
          email: 'moon.hai@1pac.vn'
        }
      },
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-03',
        id: 1,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null,
        user: {
          name: 'abc',
          email: 'abc@1pac.vn'
        }
      },
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-04',
        id: 2,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null,
        user: {
          name: 'michael.tuan',
          email: 'clara@1pac.vn'
        }
      }
    ],
    meta: {
      page: 1,
      self: null,
      user_id: '',
      from_date: '2020-01-01',
      to_date: '2020-01-08',
      group_id: '1',
      name_or_email: '',
      status: ''
    }
  }
}
