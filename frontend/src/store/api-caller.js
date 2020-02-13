import axios from 'axios'

export default function callApi(payload = {
  params: null,
  data: null
}) {
  const { method, url, params, data, headers } = payload
  headers && Object.assign(axios.defaults.headers.common, headers)

  return axios({
    method,
    url,
    params,
    data
  })
}
