import companyAllowedIPs from '@/store/modules/company-allowed-ips'
import Repository from '@/repository'
import allowedIPsData from '../../../supports/fixtures/allowed-ips.api'
import error422 from '../../../supports/fixtures/errors.api'
jest.mock('@/repository/company-settings')

const companySettingsRepository = Repository.get('companySettings')
const { state, mutations, actions } = companyAllowedIPs
const commit = jest.fn()

describe('mutations', () => {
  let payload

  describe('when allowedIPs', () => {
    it('FETCH_IPS', () => {
      payload = [...allowedIPsData.allowedIPs]
      mutations.FETCH_IPS(state, payload)

      expect(state.allowedIPs).toEqual(payload)
    })

    describe('when handle CUD allowedIPs methods', () => {
      beforeEach(() => {
        state.allowedIPs = [...allowedIPsData.allowedIPs]
      })

      it('DELETE_IP', () => {
        payload = 1
        mutations.DELETE_IPS(state, payload)

        expect(state.allowedIPs).toHaveLength(2)
        expect(state.allowedIPs.findIndex(ip => ip.id === 1)).toBe(-1)
      })

      it('CREATE_IP', () => {
        payload = { id: 4, ip_address: '192.168.0.1', created_at: '2020-01-07T09:45:14+07:00' }
        mutations.CREATE_IPS(state, payload)

        expect(state.allowedIPs).toHaveLength(4)
      })

      it('UPDATE_IP', () => {
        payload = { id: 3, ip_address: '192.168.0.1', created_at: '2020-01-07T09:45:14+07:00' }
        mutations.UPDATE_IPS(state, payload)
        const newIP = state.allowedIPs.filter(ip => ip.id === payload.id)[0]

        expect(newIP).toEqual(payload)
      })
    })
  })

  describe('when errors', () => {
    it('UPDATE_IP_ERRORS', () => {
      const payload = { errors: allowedIPsData.errors }
      mutations.UPDATE_REQUEST_ERRORS(state, payload)

      expect(state.errors.ip_address[0]).toEqual('cant be blank')
    })

    it('CLEAR_IP_ERRORS', () => {
      mutations.CLEAR_REQUEST_ERRORS(state)

      expect(state.errors).toEqual({})
    })
  })
})

describe('actions', () => {
  let response

  describe('when fetchIPs', () => {
    it('should commit FETCH_IPS', async () => {
      response = { data: [...allowedIPsData.allowedIPs] }
      companySettingsRepository.getIPs.mockResolvedValue(response)
      await actions.fetchIPs({ commit })

      expect(commit).toHaveBeenCalledWith('FETCH_IPS', response.data)
    })
  })

  describe('when deleteIP', () => {
    it('should commit DELETE_IPS', async () => {
      response = {
        created_at: '2020-01-07T09:45:14+07:00',
        id: 1,
        ip_address: '127.0.0.1'
      }
      const id = 1
      companySettingsRepository.deleteIP.mockResolvedValue(response)
      await actions.deleteIP({ commit }, id)

      expect(commit).toHaveBeenCalledWith('DELETE_IPS', id)
    })
  })

  describe('when createIP', () => {
    beforeEach(() => {
      response = { data: { ip_address: '127.0.0.0' } }
    })

    it('should resolve response', async () => {
      companySettingsRepository.createIP.mockResolvedValue(response)
      await actions.createIP({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('CREATE_IPS', response.data)
    })

    it('should reject errors', async () => {
      const mockError = error422
      companySettingsRepository.createIP.mockRejectedValue(mockError)

      await actions.createIP({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('UPDATE_REQUEST_ERRORS', mockError.response.data)
      })
    })
  })

  describe('when updateIP', () => {
    beforeEach(() => {
      response = {
        data: {
          created_at: '2020-01-07T09:45:14+07:00',
          id: 1,
          ip_address: '127.0.0.1'
        }
      }
    })

    it('should resolve response', async () => {
      companySettingsRepository.updateIP.mockResolvedValue(response)
      await actions.updateIP({ commit }, response.data)

      expect(commit).toHaveBeenCalledWith('UPDATE_IPS', response.data)
    })

    it('should reject errors', async () => {
      const mockError = error422
      companySettingsRepository.updateIP.mockRejectedValue(mockError)

      await actions.updateIP({ commit }, response.data).catch(error => {
        expect(error).toEqual(mockError)
        expect(commit).toHaveBeenCalledWith('UPDATE_REQUEST_ERRORS', mockError.response.data)
      })
    })
  })
})
