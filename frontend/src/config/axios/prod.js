import axios from 'axios'

axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.baseURL = '/api/v1'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (error.response && error.response.status === 401 && error.response.data && error.response.data.code === 'unauthenticated') {
      window.location = `/?error_msg=${error.response.data.message}`
      return
    }
    return Promise.reject(error)
  }
)
