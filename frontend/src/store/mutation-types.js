// initial-states
export const INITIAL_STATES_SET_USER = 'INITIAL_STATES_SET_USER'
export const INITIAL_STATES_SET_COMPANY = 'INITIAL_STATES_SET_COMPANY'
export const INITIAL_STATES_SET_META = 'INITIAL_STATES_SET_META'
export const INITIAL_STATES_UPDATE_USER = 'INITIAL_STATES_UPDATE_USER'
export const INITIAL_STATES_UPDATE_COMPANY = 'INITIAL_STATES_UPDATE_COMPANY'
export const INITIAL_STATES_SET_USER_ERRORS = 'INITIAL_STATES_SET_USER_ERRORS'
export const INITIAL_STATES_SET_COMPANY_ERRORS = 'INITIAL_STATES_SET_COMPANY_ERRORS'
export const INITIAL_STATES_CLEAR_USER_ERRORS = 'INITIAL_STATES_CLEAR_USER_ERRORS'
export const INITIAL_STATES_CLEAR_COMPANY_ERRORS = 'INITIAL_STATES_CLEAR_COMPANY_ERRORS'

// announcements
export const RECEIVE_ANNOUNCEMENTS = 'RECEIVE_ANNOUNCEMENTS'
export const RECEIVE_ANNOUNCEMENT = 'RECEIVE_ANNOUNCEMENT'
export const READ_ANNOUNCEMENT = 'READ_ANNOUNCEMENT'
export const RECEIVE_HEADER_ANNOUNCEMENTS = 'RECEIVE_HEADER_ANNOUNCEMENTS'

// attendances
export const RECEIVE_ATTENDANCES = 'RECEIVE_ATTENDANCES'

// punch
export const PUNCH_IN = 'PUNCH_IN'
export const PUNCH_OUT = 'PUNCH_OUT'
export const PUNCH_INIT_ATTENDANCE = 'PUNCH_INIT_ATTENDANCE'

// company-users
export const FETCH_USERS = 'FETCH_USERS'
export const DELETE_USER = 'DELETE_USER'

// company-business-days
export const FETCH_BUSINESS_DAYS = 'FETCH_BUSINESS_DAYS'
export const ADD_BUSINESS_DAY = 'ADD_BUSINESS_DAY'
export const DELETE_BUSINESS_DAY = 'DELETE_BUSINESS_DAY'
export const UPDATE_BUSINESS_DAY = 'UPDATE_BUSINESS_DAY'
export const UPDATE_BUSINESS_DAY_ERRORS = 'UPDATE_BUSINESS_DAY_ERRORS'
export const CLEAR_BUSINESS_DAY_ERRORS = 'CLEAR_BUSINESS_DAY_ERRORS'

// company-allowed_ips
export const FETCH_IPS = 'FETCH_IPS'
export const CREATE_IP = 'CREATE_IPS'
export const UPDATE_IP = 'UPDATE_IPS'
export const DELETE_IP = 'DELETE_IPS'
export const UPDATE_IP_ERRORS = 'UPDATE_REQUEST_ERRORS'
export const CLEAR_IP_ERRORS = 'CLEAR_REQUEST_ERRORS'

// company-holidays
export const FETCH_HOLIDAYS = 'FETCH_HOLIDAYS'
export const CREATE_HOLIDAY = 'CREATE_HOLIDAY'
export const UPDATE_HOLIDAY = 'UPDATE_HOLIDAY'
export const DELETE_HOLIDAY = 'DELETE_HOLIDAY'
export const UPDATE_HOLIDAY_ERRORS = 'UPDATE_HOLIDAY_ERRORS'
export const CLEAR_HOLIDAY_ERRORS = 'CLEAR_HOLIDAY_ERRORS'
export const IMPORT_NATIONAL_HOLIDAYS = 'IMPORT_NATIONAL_HOLIDAYS'

// user-sessions
export const FETCH_SESSIONS = 'FETCH_SESSIONS'
export const DELETE_SESSION = 'DELETE_SESSION'

// user-password
export const UPDATE_USER_PASSWORD_ERRORS = 'UPDATE_USER_PASSWORD_ERRORS'
export const CLEAR_USER_PASSWORD_ERRORS = 'CLEAR_USER_PASSWORD_ERRORS'

// requests
export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS'
export const ADD_REQUEST = 'ADD_REQUEST'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const DELETE_REQUEST = 'DELETE_REQUEST'
export const APPROVE_REQUEST = 'APPROVE_REQUEST'
export const REJECT_REQUEST = 'REJECT_REQUEST'
export const UPDATE_REQUEST_ERRORS = 'UPDATE_REQUEST_ERRORS'
export const CLEAR_REQUEST_ERRORS = 'CLEAR_REQUEST_ERRORS'

// groups
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUPS_ERRORS = 'UPDATE_GROUPS_ERRORS'
export const CLEAR_GROUPS_ERRORS = 'CLEAR_GROUPS_ERRORS'

// group
export const RECEIVE_GROUP = 'RECEIVE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const ADD_GROUP_USER = 'ADD_GROUP_USER'
export const REMOVE_GROUP_USER = 'REMOVE_GROUP_USER'
export const UPDATE_GROUP_ERRORS = 'UPDATE_GROUP_ERRORS'
export const CLEAR_GROUP_ERRORS = 'CLEAR_GROUP_ERRORS'
export const FETCH_USERS_NOT_IN_GROUP = 'FETCH_USERS_NOT_IN_GROUP'

// chart
export const FETCH_CHART_DATA = 'FETCH_CHART_DATA'
export const RESET_CHART_DATA = 'RESET_CHART_DATA'

// calendar
export const FETCH_CALENDAR_ATTENDANCES = 'FETCH_CALENDAR_ATTENDANCES'

// flash
export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE'
