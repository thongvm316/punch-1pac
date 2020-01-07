import axios from 'axios'

export default function callApi(payload = { params: null, data: null }) {
  const { method, url, params, data } = payload

  return axios({
    method,
    url,
    params,
    data
  })
}
