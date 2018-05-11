export default {
  group: {
    users: 'ユーザー一覧',
    attendances: '勤務状況',
    requests: '申請一覧',
    report: 'レポート',
    btn: {
      addUser: '追加',
      edit: '編集',
      save: '保存'
    },
    explain: "このグループにメンバーを追加すると、グループのアドミンはメンバーの勤務状況を見ることができます。",
    tableHeader: {
      email: 'メール',
      name: 'ユーザー名',
      actions: '操作',
      gender: '性別',
      position: '役職'
    },
    labels: {
      name: 'グループ名',
      description: '説明',
      image: '画像'
    },
    placeholder: {
      description: '説明',
      filterByEmail: 'メールで検索'
    },
    modal: {
      editUserTitle: 'ユーザー情報の編集',
      editTitle: 'グループ情報の編集'
    },
    tooltip: {
      editUser: '編集する',
      activateUser: 'アクティブ化する',
      deactivateUser: '非アクティブ化する',
      removeUser: '削除する'
    },
    confirmDialog: {
      deactivateUserTitle: 'ユーザーを非アクティブ化する',
      deactivateUserMsg: '<span class="text-bold-600">{name}</span>を非アクティブ化しますか？'
    }
  },
  header: {
    dashboard: 'ダッシュボード',
    attendances: '勤務状況',
    requests: '申請一覧',
    groups: 'グループ一覧',
    notifications: 'お知らせ',
    noNotificationMsg: '新しいお知らせがありません',
    settings: '個人設定',
    companySettings: '会社情報の設定',
    seeAll: '全て見る',
    logout: 'ログアウト',
    in: '出勤時間',
    out: '退勤時間',
    punchIn: '出勤',
    punchInSuccess: 'あなたは{at}に出勤しました',
    punchOut: '退勤',
    punchOutSuccess: 'あなたは{at}に退勤しました',
    punchOutTitle: '退勤時間を確認する',
    punchOutConfirm: 'あなたは{at}に退勤しますか？',
    btnAnnualLeave: '年次休暇',
    btnLeave: '休憩入り'
  },
  footer: {
    terms: '利用規約',
    privacy: '個人情報保護方針',
    help: 'ヘルプ',
    contact: 'お問い合わせ',
    about: '会社概要'
  },
  meta: {
    attendance_statuses: {
      attend_ok: '定刻出勤',
      attend_late: '遅刻',
      leave_early: '早退',
      leave_ok: '定刻退勤',
      unpaid_leave: '無給休暇',
      annual_leave: '年次休暇',
      leave: '欠勤日数',
      working_hours: '総勤務時間'
    },
    request_statuses: {
      pending: '申請中',
      approved: '承認済',
      rejected: '拒否'
    },
    gender: {
      male: '男性',
      female: '女性'
    },
    languages: {
      en: '英語',
      vi: 'ベトナム語',
      ja: '日本語'
    },
    weekdays: {
      monday: '月曜日',
      tuesday: '火曜日',
      wednesday: '水曜日',
      thursday: '木曜日',
      friday: '水曜日',
      saturday: '土曜日',
      sunday: '日曜日'
    },
    roles: {
      member: 'メンバー',
      admin: 'アドミン',
      superadmin: 'スーパーアドミン'
    },
    holiday_countries: {
      vietnam: 'ベトナム',
      japan: '日本'
    },
    industries: {
      hr_agency: 'HR会社',
      restaurant: 'レストラン',
      cafe_shop: 'カフェショップ',
      software_company: 'ソフトウェア会社',
      startup: '新興企業'
    }
  },
  sidebar: {
    user: {
      profile: 'プロフィール',
      password: 'パスワード',
      security: 'セキュリティ'
    },
    company: {
      profile: 'プロフィール',
      users: 'ユーザー',
      timezoneAndLanguage: '言語と時刻',
      businessDays: '営業日',
      holidays: '休日',
      allowedIPs: '許可されたIP'
    }
  },
  dashboard: {
    title: 'ダッシュボード',
    calendar: 'カレンダー',
    calendarToday: '本日',
    chart: 'チャート',
    chartNoData: "今月のデータはありません",
    recentActivities: '最新の活動',
    emptyActivity: "活動はありません",
    pendingRequests: '承認待ちの一覧',
    havePendingRequests: 'You have pending requests in below groups:',
    emptyPendingRequests: "You don't have any pending requests in your groups",
    request: {
      title: 'What kind of request do you want to send ?',
      label: 'Kind',
      kind: {
        attendance: 'Request for editing attendance',
        annual_leave: 'Request an annual leave'
      }
    }
  },
  notifications: {
    title: 'Notifications',
    btn: {
      approve: 'Approve',
      reject: 'Reject'
    },
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span> punched in',
      punch_out: '<span class="text-bold-600">{name}</span> punched out'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span> created a request',
      update: '<span class="text-bold-600">{name}</span> updated a request',
      approve: '<span class="text-bold-600">{name}</span> approved your request',
      reject: '<span class="text-bold-600">{name}</span> rejected your request'
    },
    labels: {
      date: 'Date',
      attendedAt: 'Attended At',
      leftAt: 'Left At',
      reason: 'Reason',
      rejectReason: 'Reject Reason'
    }
  },
  groups: {
    title: 'Groups',
    btn: {
      add: 'Add Group',
      leave: 'Leave',
      submit: 'Submit',
      export: 'Export CSV'
    },
    member: ' | 1 member | {count} members',
    labels: {
      name: 'Name',
      description: 'Description',
      image: 'Image'
    },
    placeholder: {
      name: 'Name',
      description: 'Description',
      filterByName: 'Filter by name'
    },
    modal: {
      addTitle: 'Add group'
    }
  },
  requests: {
    title: 'Requests',
    groupTitle: 'Requests of {name} group',
    placeholder: {
      filterByGroup: 'Filter by group',
      filterByStatus: 'Filter by status',
      filterByKind: 'Filter by kind'
    },
    labels: {
      date: 'Date',
      attendedAt: 'Attended At',
      leftAt: 'Left At',
      reason: 'Reason',
      rejectReason: 'Reject Reason'
    },
    tableHeader: {
      name: 'Name',
      email: 'Email',
      date: 'Date',
      attendedAt: 'Attended At',
      status: 'Status',
      leftAt: 'Left At',
      reason: 'Reason',
      actions: 'Actions',
      admin: 'Admin',
      kind: 'Kind',
      rejectReason: 'Reject Reason'
    },
    btn: {
      save: 'Save',
      reject: 'Reject'
    },
    modal: {
      editTitle: 'Edit request'
    },
    tooltip: {
      edit: 'Edit request',
      delete: 'Delete request',
      approve: 'Approve request',
      reject: 'Reject request'
    },
    errors: {
      bothAttendedLeft: 'Both attended at and left at {msg}'
    },
    confirmDialog: {
      deleteTitle: 'Delete request',
      deleteMsg: 'Are you sure to delete this request permanently ?'
    },
    kinds: {
      annual_leave: 'Leave',
      attendance: 'Attendance'
    }
  },
  attendances: {
    title: 'Attendances',
    groupTitle: 'Attendances of {name} group',
    placeholder: {
      fromDate: 'From date',
      toDate: 'To date',
      filterByStatus: 'Filter by status',
      filterByGroup: 'Filter by group',
      filterByUser: 'Filter by user'
    },
    tableHeader: {
      name: 'Name',
      email: 'Email',
      date: 'Date',
      attendedAt: 'Attended at',
      leftAt: 'Left at',
      status: 'Status',
      actions: 'Actions'
    },
    labels: {
      date: 'Date',
      attendedAt: 'Attended At',
      leftAt: 'Left At',
      reason: 'Reason'
    },
    btn: {
      save: 'Save',
      add: 'Add'
    },
    modal: {
      addTitle: 'Add request'
    },
    tooltip: {
      addRequest: 'Add request'
    }
  },
  user: {
    title: 'Settings for {name}',
    profile: {
      title: 'Profile',
      labels: {
        avatar: 'Avatar',
        email: 'Email',
        name: 'Name',
        gender: 'Gender',
        position: 'Position',
        language: 'Language',
        role: 'Role'
      },
      btn: {
        save: 'Save'
      }
    },
    password: {
      title: 'Password',
      labels: {
        currentPassword: 'Current password',
        newPassword: 'New password',
        confirmNewPassword: 'Confirm new password'
      },
      btn: {
        save: 'Save'
      }
    },
    security: {
      title: 'Security',
      currentSession: 'Current session',
      tableHeader: {
        client: 'Client',
        os: 'OS',
        ip: 'IP address',
        lastSignedIn: 'Last signed in'
      },
      btn: {
        revoke: 'Revoke'
      }
    }
  },
  company: {
    title: 'Company settings',
    profile: {
      title: 'Profile',
      labels: {
        logo: 'Logo',
        name: 'Name',
        industry: 'Industry',
        country: 'Country',
        address: 'Address',
        phoneNum: 'Phone number',
        postalCode: 'Postal code',
        taxCode: 'Tax code'
      },
      btn: {
        save: 'Save'
      }
    },
    businessDays: {
      title: 'Business days',
      tableHeader: {
        weekday: 'Weekday',
        morningStartAt: 'Morning start at',
        morningEndAt: 'Morning end at',
        afternoonStartAt: 'Afternoon start at',
        afternoonEndAt: 'Afternoon end at',
        actions: 'Actions'
      },
      labels: {
        weekday: 'Weekday',
        morningStartAt: 'Morning start at',
        morningEndAt: 'Morning end at',
        afternoonStartAt: 'Afternoon start at',
        afternoonEndAt: 'Afternoon end at'
      },
      btn: {
        add: 'Add Business day',
        submit: 'Submit',
        save: 'Save'
      },
      modal: {
        addTitle: 'Add business day',
        editTitle: 'Edit business day'
      },
      placeholder: {
        chooseWeekday: 'Choose a weekday'
      },
      tooltip: {
        edit: 'Edit Business day',
        delete: 'Delete Business day'
      }
    },
    allowedIPs: {
      title: 'Allowed IPs',
      tableHeader: {
        ipAddress: 'IP address',
        createdAt: 'Created at',
        actions: 'Actions'
      },
      labels: {
        ipAddress: 'IP address'
      },
      btn: {
        add: 'Add IP address',
        submit: 'Submit',
        save: 'Save'
      },
      modal: {
        addTitle: 'Add IP address',
        editTitle: 'Edit IP address'
      },
      tooltip: {
        edit: 'Edit IP address',
        delete: 'Delete IP address'
      }
    },
    timezoneAndLanguage: {
      title: 'Time',
      labels: {
        timezone: 'Timezone',
        breaktime: 'Break time'
      },
      btn: {
        save: 'Save'
      },
      msg: {
        success: "Company's timezone and language are updated"
      }
    },
    holidays: {
      title: 'Holidays',
      explain: "Import country's holidays for your company, then 1Punch will not count a holiday as leaving day",
      tableHeader: {
        name: 'Name',
        startAt: 'Start at',
        endAt: 'End at',
        actions: 'Actions'
      },
      labels: {
        name: 'Name',
        startAt: 'Start at',
        endAt: 'End at'
      },
      placeholder: {
        chooseCountry: 'Choose a country',
        filterByName: 'Filter by name',
        fromDate: 'From date',
        toDate: 'To date'
      },
      btn: {
        import: 'Import',
        add: 'Add holiday',
        submit: 'Submit',
        save: 'Save'
      },
      modal: {
        addTitle: 'Add holiday',
        editTitle: 'Edit holiday'
      },
      tooltip: {
        edit: 'Edit holiday',
        delete: 'Delete holiday'
      },
      msg: {
        importSuccess: 'Imported national holidays of {country}',
        blankOrAlreadyImported: 'You already imported national days of {country} or they are not existed'
      }
    },
    users: {
      title: 'Users',
      add: {
        title: 'Add user',
        successMsg: 'An user is created successfully',
        note: 'An email contains login information is sent to user. Please ensure that email address is correct',
        labels: {
          name: 'Name',
          email: 'Email',
          role: 'Role',
          group: 'Group'
        },
        placeholder: {
          name: 'Name',
          email: 'Email',
          chooseGroup: 'Choose a group'
        },
        btn: {
          submit: 'Submit'
        }
      },
      addMulti: {
        title: 'Add multi users',
        successCSVMsg: 'Users in csv file are created',
        note: 'An email contains login information is sent to user. Please ensure that email address is correct',
        errorMsg: 'There are incorrect information at rows {rows}',
        download: 'Download template',
        templateGuide: 'Please download the CSV file above. Fill out the cells and upload the file',
        labels: {
          csvFile: 'CSV file'
        },
        btn: {
          submit: 'Submit'
        }
      },
      placeholder: {
        filterByEmail: 'Filter by email'
      },
      tableHeader: {
        name: 'Name',
        email: 'Email',
        position: 'Position',
        group: 'Group',
        role: 'Role',
        actions: 'Actions'
      },
      btn: {
        add: 'Add user',
        addMulti: 'Add multi users'
      },
      confirmDialog: {
        deleteUserTitle: 'Delete user',
        deleteUserMsg: 'Are you sure to delete <span class="text-bold-600">{name}</span> user permanently ?'
      },
      modal: {
        editTitle: 'Edit User'
      },
      tooltip: {
        edit: 'Edit user',
        delete: 'Delete user',
        activateUser: 'Activate User',
        deactivateUser: 'Deactivate User'
      }
    }
  },
  messages: {
    company: {
      updateSuccess: "Company's information is updated",
      updateTimeSuccess: "Company's timezone and breaktime are updated"
    },
    user: {
      addSuccess: 'An user is created. Email contains login information is sent to user',
      updatePwdSuccess: 'Your password is updated',
      addMultiSuccess: 'Multi users are created. Email contains login information is sent to them',
      updateProfileSuccess: 'Your profile is updated'
    },
    ip: {
      createSuccess: 'Allowed IP address is created',
      updateSuccess: 'Allowed IP address is updated'
    },
    group: {
      createSuccess: 'Group is created',
      updateSuccess: 'Group is updated'
    },
    request: {
      createSuccess: 'Request is created',
      updateSuccess: 'Request is updated',
      approvedSuccess: 'Request is approved',
      rejectedSuccess: 'Request is rejected'
    },
    holiday: {
      createSuccess: 'Holiday is created',
      updateSuccess: 'Holiday is updated'
    },
    businessDay: {
      createSuccess: 'Business day is created',
      updateSuccess: 'Business day is updated'
    }
  },
  activity: {
    showMore: 'Show more',
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span> punched in',
      punch_out: '<span class="text-bold-600">{name}</span> punched out'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span> created a request',
      update: '<span class="text-bold-600">{name}</span> updated a request',
      approve: '<span class="text-bold-600">{name}</span> approved a request',
      reject: '<span class="text-bold-600">{name}</span> rejected a request'
    }
  },
  popup: {
    changePassword: {
      title: 'Your password is not secured',
      description: "You are using password generated by system, it's not secured. Please change your password as soon as possible",
      btnChange: 'Change password',
      btnRemind: 'Remind me later'
    }
  },
  confirmDialog: {
    yes: 'Yes',
    no: 'No'
  },
  statusCards: {
    dayNum: '{num} / {companyTotalDays} days',
    workingHours: '{hours}h{mins}m / {companyTotalHours}h'
  },
  annualLeave: {
    title: 'Request a leave',
    labels: {
      annualLeaveDay: 'Leave day',
      reason: 'Reason'
    },
    createSuccessMsg: 'A leave request is created',
    updateSuccessMsg: 'Your leave request is updated',
    submit: 'Submit',
    save: 'Save'
  },
  page404: {
    title: 'Whoop! Look like something is missing',
    content: 'Sorry, the page you are looking for doesn’t exist.',
    instruction: 'Press the button below to get back to home page.',
    btn: {
      goHome: 'Go Home'
    }
  },
  flatpickr: {
    rangeSeparator: ' to '
  },
  remind: {
    message: 'You forgot to punch in on {days}. Please send request to admin for editing attendances on those days !!!'
  }
}
