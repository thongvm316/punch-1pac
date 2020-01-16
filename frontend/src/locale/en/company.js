export default {
  title: 'Company settings',
  profile: {
    title: 'Profile'
  },
  punchMethod: {
    default: 'Default',
    qrcode: 'QRCode'
  },
  businessDays: {
    title: 'Business days',
    confirmDialog: {
      title: 'Remove BusinessDay',
      msg: 'Are you sure to remove ?'
    }
  },
  allowedIPs: {
    title: 'Allowed IPs',
    confirmDialog: {
      title: 'Remove Ip Address',
      msg: 'Are you sure to remove ip {name}'
    }
  },
  holidays: {
    title: 'Holidays',
    explain: "Import country's holidays for your company, then system will not count a holiday as leaving day",
    confirmDialog: {
      title: 'Remove Holiday',
      msg: 'Are you sure to remove {name} holiday ?'
    }
  },
  users: {
    title: 'Users',
    add: {
      title: 'Add user',
      note: 'An email contains login information is sent to user. Please ensure that email address is correct'
    },
    addMulti: {
      title: 'Add multi users',
      note: 'An email contains login information is sent to user. Please ensure that email address is correct',
      errorMsg: 'There are incorrect information at rows {rows}',
      download: 'Download template',
      templateGuide: 'Please download the CSV file above. Fill out the cells and upload the file'
    },
    confirmDialog: {
      deleteUserTitle: 'Delete user',
      deleteUserMsg: 'Are you sure to delete <span class="text-bold-600">{name}</span> user permanently ?'
    }
  }
}
