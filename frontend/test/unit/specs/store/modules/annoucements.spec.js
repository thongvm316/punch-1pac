import announcements from '@/store/modules/announcements'
import callApi from '@/store/api-caller'
import { announcementsData } from '../api-data/annoucements.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = announcements

describe('mutations', () => {
  it('RECEIVE_HEADER_ANNOUNCEMENTS', () => {
    const payload = announcementsData()
    mutations.RECEIVE_HEADER_ANNOUNCEMENTS(state, payload)

    expect(state.headerAnnouncements).toEqual(payload.announcements)
  })

  it('READ_ANNOUNCEMENT', () => {
    mutations.READ_ANNOUNCEMENT(state, 1)
    expect(state.headerAnnouncements).toHaveLength(2)
  })
})

describe('actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
  })

  it('getHeaderAnnouncements', async () => {
    const response = {
      data: announcementsData()
    }

    callApi.mockResolvedValue(response)
    await actions.getHeaderAnnouncements({ commit })

    expect(commit).toHaveBeenCalledWith('RECEIVE_HEADER_ANNOUNCEMENTS', response.data)
  })

  it('readAnnouncement', async () => {
    const response = { status: 200 }
    const id = 1
    callApi.mockResolvedValue(response)
    await actions.readAnnouncement({ commit }, id)

    expect(commit).toHaveBeenCalledWith('READ_ANNOUNCEMENT', id)
  })
})
