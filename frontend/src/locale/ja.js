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
      email: 'メールアドレス',
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
      filterByEmail: 'メールアドレスを検索'
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
    companySettings: '企業の設定',
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
    about: '企業概要'
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
    havePendingRequests: '承認待ちの依頼は以下のグロープにあります：',
    emptyPendingRequests: "あなたのグループに承認待ちの依頼は現在ありません。",
    request: {
      title: 'どのような依頼を送信しますか？',
      label: '種別',
      kind: {
        attendance: '出席者の編集依頼',
        annual_leave: '年次休暇の依頼'
      }
    }
  },
  notifications: {
    title: 'お知らせ',
    btn: {
      approve: '承認',
      reject: '拒否'
    },
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span>は出勤しました',
      punch_out: '<span class="text-bold-600">{name}</span>は退勤しました'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span>は依頼を作成しました',
      update: '<span class="text-bold-600">{name}</span>は依頼を更新しました',
      approve: '<span class="text-bold-600">{name}</span>はあなたの依頼を承認しました',
      reject: '<span class="text-bold-600">{name}</span>はあなたの依頼を拒否しました'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '理由',
      rejectReason: '拒否理由'
    }
  },
  groups: {
    title: 'グループ一覧',
    btn: {
      add: 'グループの追加',
      leave: '抜け',
      submit: '提出',
      export: 'CSV出力'
    },
    member: ' | 1 メンバー | {count} メンバー',
    labels: {
      name: 'ユーザー名',
      description: '説明',
      image: '画像'
    },
    placeholder: {
      name: 'グループ名',
      description: '説明',
      filterByName: 'グループ名で検察'
    },
    modal: {
      addTitle: 'グループの追加'
    }
  },
  requests: {
    title: '申請一覧',
    groupTitle: '{name}グループの依頼',
    placeholder: {
      filterByGroup: 'グループ名を検索',
      filterByStatus: '状態で絞り込み',
      filterByKind: '種別で絞り込み'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '理由',
      rejectReason: '拒否理由'
    },
    tableHeader: {
      name: 'ユーザー名',
      email: 'メールアドレス',
      date: '日付',
      attendedAt: '出勤時間',
      status: '申請状態',
      leftAt: '退勤時間',
      reason: '理由',
      actions: '操作',
      admin: 'アドミン',
      kind: '種別',
      rejectReason: '拒否理由'
    },
    btn: {
      save: '保存',
      reject: '拒否'
    },
    modal: {
      editTitle: '申請の変種'
    },
    tooltip: {
      edit: '編集する',
      delete: '削除する',
      approve: '承認する',
      reject: '拒否する'
    },
    errors: {
      bothAttendedLeft: '出勤時間と退勤時間は {msg}'
    },
    confirmDialog: {
      deleteTitle: '依頼の削除',
      deleteMsg: 'この依頼を削除してよろしいですか？'
    },
    kinds: {
      annual_leave: '休暇',
      attendance: '出席'
    }
  },
  attendances: {
    title: '勤務状況',
    groupTitle: '{name}グループの勤務状況',
    placeholder: {
      fromDate: '日付から',
      toDate: '日付まで',
      filterByStatus: '状態で絞り込み',
      filterByGroup: 'グループ名を検索',
      filterByUser: 'ユーザー名を検索'
    },
    tableHeader: {
      name: 'ユーザー名',
      email: 'メールアドレス',
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      status: '状態',
      actions: '操作'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '理由'
    },
    btn: {
      save: '保存する',
      add: '作成する'
    },
    modal: {
      addTitle: '依頼の作成'
    },
    tooltip: {
      addRequest: '依頼を作成する'
    }
  },
  user: {
    title: '{name}の設定',
    profile: {
      title: 'プロフィール',
      labels: {
        avatar: '画像',
        email: 'メールアドレス',
        name: 'ユーザー名',
        gender: '性別',
        position: '役職',
        language: '言語',
        role: 'アカウントの種類'
      },
      btn: {
        save: '保存'
      }
    },
    password: {
      title: 'パスワード',
      labels: {
        currentPassword: '現パスワード',
        newPassword: '新パスワード',
        confirmNewPassword: '新パスワード（確認）'
      },
      btn: {
        save: '保存'
      }
    },
    security: {
      title: 'セキュリティ',
      currentSession: '現在のセッション',
      tableHeader: {
        client: 'クライアント',
        os: 'OS',
        ip: 'IPアドレス',
        lastSignedIn: '最後のログイン日時'
      },
      btn: {
        revoke: '取り消す'
      }
    }
  },
  company: {
    title: '企業の設定',
    profile: {
      title: 'プロフィール',
      labels: {
        logo: 'ロゴ画像',
        name: '企業名',
        industry: '業種',
        country: '所在地（国）',
        address: '所在地（住所）',
        phoneNum: '電話番号',
        postalCode: '郵便番号',
        taxCode: '納税者番号'
      },
      btn: {
        save: '保存'
      }
    },
    businessDays: {
      title: '営業日',
      tableHeader: {
        weekday: '曜日',
        morningStartAt: '勤務開始',
        morningEndAt: '休憩開始',
        afternoonStartAt: '休憩終了',
        afternoonEndAt: '勤務定時',
        actions: '操作'
      },
      labels: {
        weekday: '曜日',
        morningStartAt: '勤務開始',
        morningEndAt: '休憩開始',
        afternoonStartAt: '休憩終了',
        afternoonEndAt: '勤務定時'
      },
      btn: {
        add: '営業日の追加',
        submit: '追加',
        save: '保存'
      },
      modal: {
        addTitle: '営業日の追加',
        editTitle: '営業日の編集'
      },
      placeholder: {
        chooseWeekday: '曜日を選択してください'
      },
      tooltip: {
        edit: '営業日の編集',
        delete: '営業日の削除'
      }
    },
    allowedIPs: {
      title: '許可されたIP',
      tableHeader: {
        ipAddress: 'IPアドレス',
        createdAt: '作成日',
        actions: '操作'
      },
      labels: {
        ipAddress: 'IPアドレス'
      },
      btn: {
        add: 'IPアドレスの追加',
        submit: '追加',
        save: '保存'
      },
      modal: {
        addTitle: 'IPアドレスの追加',
        editTitle: 'IPアドレスの編集'
      },
      tooltip: {
        edit: '編集する',
        delete: '削除する'
      }
    },
    timezoneAndLanguage: {
      title: '時刻',
      labels: {
        timezone: '時刻',
        breaktime: '休憩時間'
      },
      btn: {
        save: '保存'
      },
      msg: {
        success: "企業の言語と時刻の情報が更新さレました"
      }
    },
    holidays: {
      title: '休日',
      explain: "あなたの企業の祝日を追加すると、休日としてカウントされます",
      tableHeader: {
        name: '休日名',
        startAt: '開始',
        endAt: '終了',
        actions: '操作'
      },
      labels: {
        name: '休日名',
        startAt: '開始',
        endAt: '終了'
      },
      placeholder: {
        chooseCountry: '国を選択してください',
        filterByName: '休日を検索',
        fromDate: '日付から',
        toDate: '日付まで'
      },
      btn: {
        import: '取り込む',
        add: '休日の追加',
        submit: '追加',
        save: '保存'
      },
      modal: {
        addTitle: '休日の追加',
        editTitle: '休日の編集'
      },
      tooltip: {
        edit: '編集する',
        delete: '削除する'
      },
      msg: {
        importSuccess: '{country}の祝日を取り込みました',
        blankOrAlreadyImported: '{country}の祝日は既に取り込みました、または存在していません'
      }
    },
    users: {
      title: 'ユーザー',
      add: {
        title: 'ユーザーの追加',
        successMsg: '新しいユーザーが登録されました',
        note: 'ログイン情報が含まれたメールはユーザーに送信されました。メールボックスをチェックしてください',
        labels: {
          name: 'ユーザー名',
          email: 'メールアドレス',
          role: 'アカウントの種類',
          group: 'グループ'
        },
        placeholder: {
          name: '氏名',
          email: 'メールアドレス',
          chooseGroup: 'グループを選択してください'
        },
        btn: {
          submit: '追加'
        }
      },
      addMulti: {
        title: 'ユーザーの一括追加',
        successCSVMsg: 'CSVファイルに指定されたユーザーの全ては追加しました',
        note: 'ログイン情報が含まれたメールはユーザーに送信されました。メールボックスをチェックしてください',
        errorMsg: '{rows}に不正な情報があります',
        download: 'ユーザ一括追加用CSVテンプレート',
        templateGuide: '上記のCSVテンプレートをダウンロードしてください. 内容を編集後、CSVファイルをアップロードしてください',
        labels: {
          csvFile: 'CSVファイル'
        },
        btn: {
          submit: '一括登録'
        }
      },
      placeholder: {
        filterByEmail: 'メールアドレスを検索'
      },
      tableHeader: {
        name: '氏名',
        email: 'メールアドレス',
        position: '役職',
        group: 'グループ',
        role: 'アカウントの種類',
        actions: '操作'
      },
      btn: {
        add: 'ユーザーの追加',
        addMulti: 'ユーザーの一括追加'
      },
      confirmDialog: {
        deleteUserTitle: 'ユーザーの削除',
        deleteUserMsg: '<span class="text-bold-600">{name}</span>を削除してよろしですか？'
      },
      modal: {
        editTitle: 'ユーザーの編集'
      },
      tooltip: {
        edit: '編集する',
        delete: '削除する',
        activateUser: 'アクティブ化する',
        deactivateUser: '非アクティブ化する'
      }
    }
  },
  messages: {
    company: {
      updateSuccess: "企業情報が更新されました",
      updateTimeSuccess: "企業の時刻と休憩時間が更新されました"
    },
    user: {
      addSuccess: '新しいユーザーが登録されました。ログイン情報が含まれたメールはユーザーに送信されました。',
      updatePwdSuccess: 'パスワードが更新されました',
      addMultiSuccess: 'ユーザーが一括登録しました。ログイン情報が含まれたメールはユーザーに送信されました。',
      updateProfileSuccess: 'あなたのプロフィールが更新されました'
    },
    ip: {
      createSuccess: '許可されたIPアドレスは追加ました',
      updateSuccess: '許可されたIPアドレスはアップデートました'
    },
    group: {
      createSuccess: 'グループは追加しました',
      updateSuccess: 'グループの情報はアップデートアップデートしました'
    },
    request: {
      createSuccess: '依頼が作成しました',
      updateSuccess: '依頼がアップデートしました',
      approvedSuccess: 'あなたの依頼が承認されました',
      rejectedSuccess: 'あなたの依頼が拒否されました'
    },
    holiday: {
      createSuccess: '休日が追加しました',
      updateSuccess: '休日がアップデートしました'
    },
    businessDay: {
      createSuccess: '営業日が追加しました',
      updateSuccess: '営業日がアップデートしました'
    }
  },
  activity: {
    showMore: '詳細を見る',
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span>が出勤しました',
      punch_out: '<span class="text-bold-600">{name}</span>が退勤しました'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span>が新しい依頼を作成しました',
      update: '<span class="text-bold-600">{name}</span>が依頼をアップデートしました',
      approve: '<span class="text-bold-600">{name}</span>が依頼を承認しました',
      reject: '<span class="text-bold-600">{name}</span>が依頼を拒否しました'
    }
  },
  popup: {
    changePassword: {
      title: 'あなたのパスワードは保護されていません',
      description: "あなたはシステムによって生成されたパスワードを使用していますが、安全ではありません。新しいパスワードを変更してください",
      btnChange: 'パスワードの変更',
      btnRemind: '後でリマインド'
    }
  },
  confirmDialog: {
    yes: 'はい',
    no: 'いいえ'
  },
  statusCards: {
    dayNum: '{num} / {companyTotalDays}日',
    workingHours: '{hours}時{mins}分 / {companyTotalHours}時'
  },
  annualLeave: {
    title: '休暇の依頼',
    labels: {
      annualLeaveDay: '休暇',
      reason: '理由'
    },
    createSuccessMsg: '新しい休暇依頼が作成しました',
    updateSuccessMsg: 'あなたの休暇依頼がアップデートしました',
    submit: 'Submit',
    save: '保存'
  },
  page404: {
    title: 'お探しのページが見つかりましせんでした',
    content: '申し訳ございません。お探しのページが見つかりませんでした。',
    instruction: '下のボタンを押すと、ホームページに戻ります。',
    btn: {
      goHome: 'ホームページに戻る'
    }
  },
  flatpickr: {
    rangeSeparator: ' - '
  },
  remind: {
    message: 'あなたは{days}に出勤登録を忘れました. 当日は出席者を編集するためにアドミンに依頼を送信してください。'
  }
}
