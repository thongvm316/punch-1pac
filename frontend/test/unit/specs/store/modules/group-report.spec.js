import groupReport from '@/store/modules/group-report.js'
import Repositories from '@/repository'
import reportsData from '../../../supports/fixtures/report.api'
jest.mock('@/repository/groups')

const groupsRepository = Repositories.get('groups')
const { state, mutations, actions } = groupReport
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should FETCH_GROUP_REPORT', () => {
    payload = {
      results: [...reportsData.groups],
      meta: reportsData.meta
    }
    mutations.FETCH_GROUP_REPORT(state, payload)

    expect(state.results).toEqual(payload.results)
    expect(state.reportMeta).toEqual(payload.meta)
  })

  it('should FETCH_PERSONAL_REPORT', () => {
    payload = {
      results: {...reportsData.personal},
      meta: reportsData.meta
    }
    mutations.FETCH_PERSONAL_REPORT(state, payload)

    expect(state.personalReport.report).toEqual(payload.report)
    expect(state.personalReport.totalWorkingDays).toEqual(payload.meta.company_total_working_days_in_month)
    expect(state.personalReport.totalWorkingHours).toEqual(payload.meta.company_total_working_hours_on_month)
  })
})

describe('actions', () => {
  let response
  const params = {
    date: '2020-01-01',
    date_type: 'month'
  }

  describe('when getGroupReport', () => {
    it('should commit FETCH_GROUP_REPORT', async () => {
      response = { data: [...reportsData] }
      groupsRepository.getGroupReport.mockResolvedValue(response)
      await actions.getGroupReport({ commit }, params)

      expect(commit).toHaveBeenCalledWith('FETCH_GROUP_REPORT', response.data)
    })
  })

  describe('when getGroupReport', () => {
    it('should commit FETCH_GROUP_REPORT', async () => {
      response = { data: [...reportsData] }
      groupsRepository.getPersonalReport.mockResolvedValue(response)
      await actions.getPersonalReport({ commit }, params)

      expect(commit).toHaveBeenCalledWith('FETCH_PERSONAL_REPORT', response.data)
    })
  })
})
