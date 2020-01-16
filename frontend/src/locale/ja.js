import tableHeader from './ja/table'
import button from './ja/button'
import label from './ja/label'
import tooltip from './ja/tooltip'
import header from './ja/header'
import footer from './ja/footer'
import meta from './ja/meta'
import sidebar from './ja/sidebar'
import modal from './ja/modal'
import notification from './ja/notification'
import placeholder from './ja/placeholder'
import messages from './ja/messages'
import validation from './ja/validation'
import activity from './ja/activity'
import popup from './ja/popup'

import dashboard from './ja/dashboard'
import group from './ja/group'
import groups from './ja/groups'
import attendances from './ja/attendances'
import requests from './ja/requests'
import report from './ja/report'
import user from './ja/user'
import company from './ja/company'

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
    yes: 'はい',
    no: 'いいえ'
  },
  statusCards: {
    dayNum: '{num} / {companyTotalDays}日',
    workingHours: '{hours}時{mins}分 / {companyTotalHours}時'
  },
  page404: {
    title: 'お探しのページが見つかりましせんでした',
    content: '申し訳ございません。お探しのページが見つかりませんでした。',
    instruction: '下のボタンを押すと、ホームに戻ります。'
  },
  flatpickr: {
    rangeSeparator: ' - '
  },
  remind: {
    message: 'あなたは{days}の勤怠記録をしていません。該当日の勤怠状況を編集するには、管理者に申請してください。'
  },
  filterUserBox: {
    noOptions: '一致するユーザーはいません。'
  }
}
