export default {
  group: {
    users: 'ユーザー一覧',
    attendances: '勤怠管理',
    requests: '申請一覧',
    report: 'レポート',
    month: '月',
    year: '年',
    btn: {
      addUser: '追加',
      edit: '編集',
      save: '保存',
      delete: 'グループの削除'
    },
    explain: 'このグループにメンバーを追加すると、グループの管理者はメンバーの勤務状況を見ることができます。',
    tableHeader: {
      email: 'メールアドレス',
      name: 'ユーザー名',
      actions: '操作',
      gender: '性別',
      position: '役職',
      role: '権限'
    },
    labels: {
      name: 'グループ名',
      description: '説明',
      image: '画像'
    },
    placeholder: {
      description: '説明',
      filterByEmail: 'メールアドレスで検索',
      searchByNameEmail: 'ユーザー名またはメールアドレスでユーザーを検索'
    },
    modal: {
      editUserTitle: 'ユーザー情報の編集',
      editTitle: 'グループ情報の編集'
    },
    tooltip: {
      editUser: '編集する',
      activateUser: '再開する',
      deactivateUser: '停止する',
      removeUser: '削除する'
    },
    confirmDialog: {
      deactivateUserTitle: 'ユーザーを停止する',
      deactivateUserMsg: '<span class="text-bold-600">{name}</span>を停止しますか？',
      deleteGroupTitle: 'グループの削除',
      deleteGroupMsg: '<span class="text-bold-600">{name}</span> グループを削除してよろしいですか？'
    }
  },
  header: {
    dashboard: 'ダッシュボード',
    attendances: '勤怠管理',
    requests: '申請一覧',
    groups: 'グループ一覧',
    notifications: 'お知らせ',
    noNotificationMsg: '現在新しいお知らせはありません',
    settings: '個人設定',
    companySettings: '組織の設定',
    seeAll: '全て見る',
    logout: 'ログアウト',
    in: '出勤時間',
    out: '退勤時間',
    punchIn: '出勤',
    punchInSuccess: '{at}に出勤しました',
    punchOut: '退勤',
    punchOutSuccess: '{at}に退勤しました',
    punchOutTitle: '退勤時間を確認する',
    punchOutConfirm: '{at}に退勤しますか？',
    btnAnnualLeave: '年次休暇',
    btnLeave: '休憩入り',
    changeLanguage: '言語を変更',
    languages: '言語'
  },
  footer: {
    terms: 'プライバシーポリシー',
    privacy: '個人情報保護方針',
    help: 'ヘルプ',
    contact: 'お問い合わせ',
    about: '企業情報'
  },
  meta: {
    attendance_statuses: {
      attend_ok: '定刻出勤',
      attend_late: '遅刻',
      leave_early: '早退',
      leave_ok: '定刻退勤',
      unpaid_leave: '無給休暇',
      annual_leave: '年次休暇',
      leave: '欠勤',
      working_hours: '総勤務時間'
    },
    request_statuses: {
      pending: '承認待ち',
      approved: '承認済',
      rejected: '却下'
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
      admin: '管理者',
      superadmin: 'スーパー管理者'
    },
    holiday_countries: {
      vietnam: 'ベトナム',
      japan: '日本'
    },
    industries: {
      hr_agency: '人材紹介会社',
      restaurant: 'レストラン',
      cafe_shop: 'カフェショップ',
      software_company: 'ソフトウェア会社',
      startup: 'スタートアップ企業'
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
    calendarToday: '今日',
    chart: 'チャート',
    chartNoData: '今月のデータはありません',
    recentActivities: '最近のアクティビティ',
    emptyActivity: 'アクティビティはありません',
    pendingRequests: '承認待ち一覧',
    havePendingRequests: '以下のグループにユーザーからの申請が届いています。',
    emptyPendingRequests: '現在新しい申請はありません。',
    request: {
      title: '何を申請しますか？',
      label: '以下から選択してください',
      kind: {
        attendance: '勤怠の修正',
        annual_leave: '休暇・欠勤'
      }
    }
  },
  notifications: {
    title: 'お知らせ',
    btn: {
      approve: '承認',
      reject: '却下'
    },
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span>は出勤しました',
      punch_out: '<span class="text-bold-600">{name}</span>は退勤しました'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span>が申請を提出しました',
      update: '<span class="text-bold-600">{name}</span>が申請を更新しました',
      approve: '<span class="text-bold-600">{name}</span>があなたの申請を承認しました',
      reject: '<span class="text-bold-600">{name}</span>があなたの申請を却下しました'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '理由',
      rejectReason: '却下理由'
    }
  },
  groups: {
    title: 'グループ一覧',
    btn: {
      add: 'グループの追加',
      leave: 'グループから退出',
      submit: '保存',
      export: 'CSV出力'
    },
    member: ' | 1名 | {count}名',
    labels: {
      name: 'ユーザー名',
      description: '説明',
      image: '画像'
    },
    placeholder: {
      name: 'グループ名',
      description: '説明',
      filterByName: 'グループ名を検察'
    },
    modal: {
      addTitle: 'グループの追加'
    }
  },
  requests: {
    title: '申請一覧',
    groupTitle: '{name}グループの申請',
    placeholder: {
      filterByGroup: 'グループ名で検索',
      filterByStatus: 'ステータスで検索',
      filterByKind: '申請内容で検索',
      filterByUser: 'ユーザーで検索'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '理由',
      rejectReason: '却下理由'
    },
    tableHeader: {
      name: 'ユーザー名',
      email: 'メールアドレス',
      date: '日付',
      attendedAt: '出勤時間',
      status: 'ステータス',
      leftAt: '退勤時間',
      reason: '理由',
      actions: '操作',
      admin: '管理者',
      kind: '種別',
      rejectReason: '却下理由'
    },
    btn: {
      save: '保存',
      reject: '却下'
    },
    modal: {
      editTitle: '申請の編集'
    },
    tooltip: {
      edit: '編集する',
      delete: '削除する',
      approve: '承認する',
      reject: '却下する'
    },
    errors: {
      bothAttendedLeft: '出勤時間と退勤時間{msg}'
    },
    confirmDialog: {
      deleteTitle: '申請の削除',
      deleteMsg: 'この申請を削除してよろしいですか？'
    },
    kinds: {
      annual_leave: '休暇',
      attendance: '勤怠'
    }
  },
  attendances: {
    title: '勤怠管理',
    groupTitle: '{name}グループの勤怠管理',
    placeholder: {
      fromDate: '日付から',
      toDate: '日付まで',
      filterByStatus: 'ステータスで検索',
      filterByGroup: 'グループ名で検索',
      filterByUser: 'ユーザー名で検索'
    },
    tableHeader: {
      name: 'ユーザー名',
      email: 'メールアドレス',
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      status: 'ステータス',
      actions: '操作'
    },
    labels: {
      date: '日付',
      attendedAt: '出勤時間',
      leftAt: '退勤時間',
      reason: '参考'
    },
    btn: {
      save: '保存',
      add: '追加'
    },
    modal: {
      addTitle: '修正を依頼する'
    },
    tooltip: {
      addRequest: '修正を依頼する'
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
        role: '権限'
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
    title: '組織の設定',
    profile: {
      title: 'プロフィール',
      labels: {
        logo: 'ロゴ画像',
        name: '組織名',
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
        afternoonEndAt: '勤務終了'
      },
      btn: {
        add: '営業日の追加',
        submit: '保存',
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
        submit: '保存',
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
        timezone: 'タイムゾーン',
        breaktime: '休憩時間'
      },
      btn: {
        save: '保存'
      },
      msg: {
        success: '組織の「時刻と言語」が更新されました'
      }
    },
    holidays: {
      title: '休日',
      explain: '組織の祝日を追加すると、休日としてカウントされます',
      tableHeader: {
        name: '名称',
        startAt: '開始',
        endAt: '終了',
        actions: '操作'
      },
      labels: {
        name: '名称',
        startAt: '開始',
        endAt: '終了'
      },
      placeholder: {
        chooseCountry: '国を選択してください',
        filterByName: '休日で検索',
        fromDate: '日付から',
        toDate: '日付まで'
      },
      btn: {
        import: 'インポート',
        add: '休日の追加',
        submit: '保存',
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
        importSuccess: '{country}の祝日をインポートしました',
        blankOrAlreadyImported: '{country}の祝日は既にインポートされているか、または存在していません'
      }
    },
    users: {
      title: 'ユーザー',
      add: {
        title: 'ユーザーの追加',
        successMsg: '新しいユーザーが登録されました',
        note: 'ログイン情報が含まれたメールを送信しました。メールボックスをチェックしてください',
        labels: {
          name: 'ユーザー名',
          email: 'メールアドレス',
          role: '権限',
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
        successCSVMsg: 'CSVファイルに指定された全てのユーザーを追加しました',
        note: 'ログイン情報が含まれたメールを送信しました。メールボックスをチェックしてください',
        errorMsg: '{rows}に不正情報があります',
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
        filterByEmail: 'メールアドレスで検索'
      },
      tableHeader: {
        name: '氏名',
        email: 'メールアドレス',
        position: '役職',
        group: 'グループ',
        role: '権限',
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
        activateUser: '再開する',
        deactivateUser: '停止する'
      }
    }
  },
  messages: {
    company: {
      updateSuccess: '組織情報を更新しました',
      updateTimeSuccess: '組織の時刻と休憩時間を更新しました'
    },
    user: {
      addSuccess: '新しいユーザーを登録しました。ログイン情報が含まれたメールをユーザーに送信しました',
      updatePwdSuccess: 'パスワードを更新しました',
      addMultiSuccess: 'ユーザーを一括登録しました。ログイン情報が含まれたメールをユーザーに送信しました',
      updateProfileSuccess: 'あなたのプロフィールを更新しました'
    },
    ip: {
      createSuccess: '許可されたIPアドレスを追加ました',
      updateSuccess: '許可されたIPアドレスを更新ました'
    },
    group: {
      createSuccess: 'グループを追加しました',
      updateSuccess: 'グループの情報を更新しました',
      addMemberSuccess: '新しいメンバーを追加しました'
    },
    request: {
      createSuccess: '申請を提出しました',
      updateSuccess: '申請を更新しました',
      approvedSuccess: 'あなたの申請が承認されました',
      rejectedSuccess: 'あなたの申請が却下されました'
    },
    holiday: {
      createSuccess: '休日を追加しました',
      updateSuccess: '休日を更新しました'
    },
    businessDay: {
      createSuccess: '営業日を追加しました',
      updateSuccess: '営業日を更新しました'
    }
  },
  activity: {
    showMore: '詳細を見る',
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span>が出勤しました',
      punch_out: '<span class="text-bold-600">{name}</span>が退勤しました'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span>が新しい修正を依頼しました',
      update: '<span class="text-bold-600">{name}</span>が申請を更新しました',
      approve: '<span class="text-bold-600">{name}</span>が申請を承認しました',
      reject: '<span class="text-bold-600">{name}</span>が申請を却下しました'
    }
  },
  popup: {
    changePassword: {
      title: 'あなたのパスワードは保護されていません',
      description: '現在のパスワードはシステムが自動生成したものですが、安全ではありません。あなた自身の新しいパスワードを設定してください',
      btnChange: 'パスワードの変更',
      btnRemind: 'あとでリマインド'
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
    title: '休暇申請',
    labels: {
      annualLeaveDay: '休暇',
      reason: '理由'
    },
    createSuccessMsg: '新しい休暇申請を提出しました',
    updateSuccessMsg: 'あなたの休暇申請が更新しました',
    submit: '保存',
    save: '保存'
  },
  page404: {
    title: 'お探しのページが見つかりましせんでした',
    content: '申し訳ございません。お探しのページが見つかりませんでした。',
    instruction: '下のボタンを押すと、ホームに戻ります。',
    btn: {
      goHome: 'ホームに戻る'
    }
  },
  flatpickr: {
    rangeSeparator: ' - '
  },
  remind: {
    message: 'あなたは{days}の勤怠記録をしていません。該当日の勤怠状況を編集するには、管理者に申請してください。'
  },
  filterUserBox: {
    noOptions: '一致するユーザーはいません'
  }
}
