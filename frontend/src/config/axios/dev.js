import axios from 'axios'

axios.defaults.baseURL = 'http://namespace_1.localhost:3000/api/v1'
axios.defaults.headers.common['Authorization'] =
  'Bear eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk2OTE2NTMsImp0aSI6ImU1ODg4NGRmLWVhNjItNDBkNy1iZTRkLWFhYWU1OTZiY2U3NCIsInN1YiI6Mn0.IlXO9hb_nsnwLwrDg4Xm7DpZ_ryVsO9syZorcl5k5Bw'
axios.defaults.headers.common['Accept'] = 'application/json'
