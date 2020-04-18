export const attendancesData = () => {
  return {
    attendances: [
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-01',
        id: 0,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null
      },
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-03',
        id: 1,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null
      },
      {
        attended_at: '09:45',
        attending_status: 'attend_ok',
        day: '2020-01-04',
        id: 2,
        leaving_status: 'leave_ok',
        left_at: '09:45',
        off_status: null
      }
    ],
    meta: {
      forgot_punch_in_days: [
        '2019-01-02',
        '2019-01-10'
      ]
    }
  }
}
