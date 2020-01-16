export default {
  title: 'Tuỳ chỉnh công ty',
  profile: {
    title: 'Thông tin công ty'
  },
  punchMethod: {
    default: 'Mặc định',
    qrcode: 'Mã QR'
  },
  businessDays: {
    title: 'Ngày đi làm',
    confirmDialog: {
      title: 'Remove BusinessDay',
      msg: 'Are you sure to remove ?'
    }
  },
  allowedIPs: {
    title: 'Địa chỉ IP',
    confirmDialog: {
      title: 'Remove Ip Address',
      msg: 'Are you sure to remove ip {name}'
    }
  },
  holidays: {
    title: 'Ngày lễ',
    explain: 'Thêm ngày lễ cho công ty sẽ giúp hệ thống tính đúng ngày nghỉ của thành viên',
    confirmDialog: {
      title: 'Remove Holiday',
      msg: 'Are you sure to remove {name} holiday ?'
    }
  },
  users: {
    title: 'Thành viên',
    add: {
      title: 'Tạo thành viên',
      note: 'Một email chưa thông tin đăng nhập của thành viên sẽ được gửi đến địa chỉ email. Vui lòng đảm bảo địa chỉ email chính xác'
    },
    addMulti: {
      title: 'Tạo nhiều thành viên',
      note: 'Một email chưa thông tin đăng nhập của thành viên sẽ được gửi đến địa chỉ email. Vui lòng đảm bảo địa chỉ email chính xác',
      errorMsg: 'Thông tin sai lêch ở một số dòng sau {rows}',
      download: 'Tải tập tin mẫu',
      templateGuide: 'Vui lòng tải tập tin mẫu, điền thông tin thành viên vào ô trống sau đó đẩy tập tin lên'
    },
    confirmDialog: {
      deleteUserTitle: 'Xoá thành viên',
      deleteUserMsg: 'Bạn có chắc muốn xoá thành viên <span class="text-bold-600">{name}</span> vĩnh viễn ?'
    }
  }
}
