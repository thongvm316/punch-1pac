// Components
import button from './en/button'
import label from './en/label'
import tooltip from './en/tooltip'
import tableHeader from './en/table'
import header from './en/header'
import footer from './en/footer'
import meta from './en/meta'
import sidebar from './en/sidebar'
import modal from './en/modal'
import notification from './en/notification'
import placeholder from './en/placeholder'
import messages from './en/messages'
import validation from './en/validation'
import activity from './en/activity'
import popup from './en/popup'

// Pages
import group from './en/group'
import groups from './en/groups'
import dashboard from './en/dashboard'
import attendances from './en/attendances'
import requests from './en/requests'
import report from './en/report'
import user from './en/user'
import company from './en/company'

export default {
  header,
  footer,
  meta,
  sidebar,
  modal,
  notification,
  placeholder,
  messages,
  validation,
  tooltip,
  label,
  button,
  tableHeader,
  activity,
  dashboard,
  group,
  groups,
  attendances,
  requests,
  report,
  user,
  company,
  popup,
  confirmDialog: {
    yes: 'Yes',
    no: 'No'
  },
  statusCards: {
    dayNum: '{num} / {companyTotalDays} days',
    workingHours: '{hours}h{mins}m / {companyTotalHours}h'
  },
  page404: {
    title: 'Whoop! Look like something is missing',
    content: 'Sorry, the page you are looking for doesn’t exist.',
    instruction: 'Press the button below to get back to home page.'
  },
  flatpickr: {
    rangeSeparator: ' to '
  },
  remind: {
    message: 'You forgot to punch in on {days}. Please send request to admin for editing attendances on those days !!!'
  },
  filterUserBox: {
    noOptions: 'No user matching'
  }
}
