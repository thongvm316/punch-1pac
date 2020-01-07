export const calendarData = () => {
  return {
    attendances: [
      {
        id: 1,
        day: "2018-01-24",
        attended_at: "08:00",
        left_at: "18:32",
        attending_status: "arrive_ok",
        leaving_status: "leave_ok",
        off_status: null
      },
      {
        id: 2,
        day: "2018-01-24",
        attended_at: "08:00",
        left_at: "19:17",
        attending_status: "attend_late",
        leaving_status: "leave_ok",
        off_status: null
      },
      {
        id: 3,
        day: "2018-01-24",
        attended_at: "08:00",
        left_at: "18:32",
        attending_status: "arrive_ok",
        leaving_status: "leave_ok",
        off_status: null
      }
    ],
    holidays: [
      {
        id: 1,
        name: "Spring vacation",
        started_at: "2018-01-20",
        ended_at: "2018-01-21"
      },
      {
        id: 2,
        name: "Summer vacation",
        started_at: "2018-01-20",
        ended_at: "2018-01-21"
      }
    ]
  }
}
