export const notificationsData = () => {
  return {
    notifications: [
      {
        id: 0,
        kind: 'request',
        activitable_id: 0,
        activitable_type: 'Request',
        activitable: {
          status: null
        },
        created_at: '2019-01-01'
      },
      {
        id: 1,
        kind: 'update',
        activitable_id: 1,
        activitable_type: 'Attendance',
        activitable: {
          status: null
        },
        created_at: '2019-01-02'
      },
      {
        id: 2,
        kind: 'request',
        activitable_id: 2,
        activitable_type: 'Request',
        activitable: {
          status: null
        },
        created_at: '2019-01-03'
      }
    ],
    meta: {
      unread_notifications_count: 10
    }
  }
}
