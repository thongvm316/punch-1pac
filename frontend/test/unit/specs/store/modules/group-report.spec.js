import groupReport from '@/store/modules/group-report.js'
import callApi from '@/store/api-caller'
import { groupReportsData, personalReportData } from '../api-data/group-report.api.js'
jest.mock('@/store/api-caller')

const { state, mutations, actions } = groupReport
const commit = jest.fn()

describe('mutations', () => {
  let payload

  it('should FETCH_GROUP_REPORT', () => {
    payload = groupReportsData()
    mutations.FETCH_GROUP_REPORT(state, payload)

    expect(state.results).toEqual(payload.results)
    expect(state.reportMeta).toEqual(payload.meta)
  })

  it('should FETCH_PERSONAL_REPORT', () => {
    payload = personalReportData()
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
      response = { data: groupReportsData() }
      callApi.mockResolvedValue(response)
      await actions.getGroupReport({ commit }, params)

      expect(commit).toHaveBeenCalledWith('FETCH_GROUP_REPORT', response.data)
    })
  })

  describe('when getGroupReport', () => {
    it('should commit FETCH_GROUP_REPORT', async () => {
      response = { data: personalReportData() }
      callApi.mockResolvedValue(response)
      await actions.getPersonalReport({ commit }, params)

      expect(commit).toHaveBeenCalledWith('FETCH_PERSONAL_REPORT', response.data)
    })
  })
})
