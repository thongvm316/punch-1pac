import announcements from '@/store/modules/announcements'
import Repository from '@/repository'
import announcementsData from '../../../supports/fixtures/annoucements.api'
jest.mock('@/repository/announcements')

const announcementsRepository = Repository.get('announcements')
const { state, mutations, actions } = announcements
const commit = jest.fn()

describe('mutations', () => {
  it('RECEIVE_HEADER_ANNOUNCEMENTS', () => {
    const payload = {
      annoucements: [...announcementsData.announcements]
    }
    mutations.RECEIVE_HEADER_ANNOUNCEMENTS(state, payload)

    expect(state.headerAnnouncements).toEqual(payload.announcements)
  })

  it('READ_ANNOUNCEMENT', () => {
    state.headerAnnouncements = [...announcementsData.announcements]
    mutations.READ_ANNOUNCEMENT(state, 1)
    expect(state.headerAnnouncements).toHaveLength(2)
  })
})

describe('actions', () => {
  it('getHeaderAnnouncements', async () => {
    const response = {
      data: [...announcementsData.announcements]
    }

    announcementsRepository.getHeaderAnnouncements.mockResolvedValue(response)
    await actions.getHeaderAnnouncements({ commit })

    expect(commit).toHaveBeenCalledWith('RECEIVE_HEADER_ANNOUNCEMENTS', response.data)
  })

  it('readAnnouncement', async () => {
    const response = { status: 200 }
    const id = 1
    announcementsRepository.readAnnouncement.mockResolvedValue(response)
    await actions.readAnnouncement({ commit }, id)

    expect(commit).toHaveBeenCalledWith('READ_ANNOUNCEMENT', id)
  })
})
