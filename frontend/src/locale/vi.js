// components
import tableHeader from './vi/table'
import button from './vi/button'
import label from './vi/label'
import tooltip from './vi/tooltip'
import header from './vi/header'
import footer from './vi/footer'
import meta from './vi/meta'
import sidebar from './vi/sidebar'
import modal from './vi/modal'
import notification from './vi/notification'
import placeholder from './vi/placeholder'
import messages from './vi/messages'
import validation from './vi/validation'
import activity from './vi/activity'
import popup from './vi/popup'

// pages
import group from './vi/group'
import groups from './vi/groups'
import dashboard from './vi/dashboard'
import attendances from './vi/attendances'
import requests from './vi/requests'
import report from './vi/report'
import user from './vi/user'
import company from './vi/company'

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
  dashboard,
  group,
  groups,
  attendances,
  requests,
  report,
  user,
  company,
  activity,
  popup,
  confirmDialog: {
    yes: 'Có',
    no: 'Không'
  },
  statusCards: {
    dayNum: '0 ngày | 1 ngày | {num} ngày',
    workingHours: '{hours}h{mins}m/{companyTotalHours}h'
  },
  page404: {
    title: 'Ý Da! Có vẻ như có gì đó không ổn',
    content: 'Xin lỗi, nhưng trang web bạn đang tìm không tồn tại.',
    instruction: 'Nhấn nút bên dưới để về trang chính.'
  },
  flatpickr: {
    rangeSeparator: ' đến '
  },
  remind: {
    message: 'Bạn quên bấm đến rồi vào các ngày {days}. Vui lòng tạo yêu cầu chỉnh sửa thông tin hiện diện các ngày hôm đó'
  },
  filterUserBox: {
    noOptions: 'Không tìm thấy thành viên'
  }
}
