export const activitiesData = () => {
  return {
    activities: [
      {
        id: 0,
        activitable_id: 0,
        activitable_type: 'Request',
        kind: 'create',
        created_at: '2019-01-01'
      },
      {
        id: 1,
        activitable_id: 0,
        activitable_type: 'Request',
        kind: 'update',
        created_at: '2019-01-02'
      }
    ],
    meta: { current_page: 1,
      next_page: 2,
      per_page: 10,
      total_pages: 10
    }
  }
}

export const activitiesDataAddOn = () => {
  return {
    activities: [
      {
        id: 2,
        activitable_id: 0,
        activitable_type: 'Punch',
        kind: 'create',
        created_at: '2019-01-03'
      },
      {
        id: 3,
        activitable_id: 0,
        activitable_type: 'Punch',
        kind: 'create',
        created_at: '2019-01-04'
      }
    ],
    meta: {
      current_page: 2,
      next_page: 3,
      previous_page: 1,
      per_page: 10,
      total_pages: 10
    }
  }
}
