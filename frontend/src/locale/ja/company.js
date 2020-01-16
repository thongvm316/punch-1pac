export default {
  title: '組織の設定',
  profile: {
    title: 'プロフィール'
  },
  punchMethod: {
    default: 'デフォルト',
    qrcode: 'QRコード'
  },
  businessDays: {
    title: '営業日',
    confirmDialog: {
      title: 'Remove BusinessDay',
      msg: 'Are you sure to remove ?'
    }
  },
  allowedIPs: {
    title: '許可されたIP',
    confirmDialog: {
      title: 'Remove Ip Address',
      msg: 'Are you sure to remove ip {name}'
    }
  },
  holidays: {
    title: '休日',
    explain: '組織の祝日を追加すると、休日としてカウントされます。',
    confirmDialog: {
      title: 'Remove Holiday',
      msg: 'Are you sure to remove {name} holiday ?'
    }
  },
  users: {
    title: 'ユーザー',
    add: {
      title: 'ユーザーの追加',
      note: 'ログイン情報が含まれたメールを送信しました。メールボックスをチェックしてください。'
    },
    addMulti: {
      title: 'ユーザーの一括追加',
      successCSVMsg: 'CSVファイルに指定された全てのユーザーを追加しました。',
      note: 'ログイン情報が含まれたメールを送信しました。メールボックスをチェックしてください。',
      errorMsg: '{rows}に不正情報があります',
      download: 'ユーザ一括追加用CSVテンプレート',
      templateGuide: '上記のCSVテンプレートをダウンロードしてください。内容を編集後、CSVファイルをアップロードしてください。'
    },
    confirmDialog: {
      deleteUserTitle: 'ユーザーの削除',
      deleteUserMsg: '<span class="text-bold-600">{name}</span>を削除してよろしですか？'
    }
  }
}
