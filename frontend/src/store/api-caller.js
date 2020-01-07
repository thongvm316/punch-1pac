import axios from 'axios'

export default function callApi(method = 'get', endpoint, data = null) {
  return axios({
    method: method,
    url: endpoint,
    data: data
  })
}
