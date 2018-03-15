import moment from 'moment-timezone'

moment.tz.setDefault(window.INITIAL_STATE.company.timezone)
moment.locale(window.INITIAL_STATE.user.language)

export default moment
