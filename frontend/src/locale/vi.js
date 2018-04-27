export default {
  group: {
    users: 'Thành viên',
    attendances: 'Hiện diện',
    requests: 'Yêu cầu',
    report: 'Thống kê',
    btn: {
      addUser: 'Thêm',
      edit: 'Chỉnh sửa Nhóm',
      save: 'Lưu'
    },
    explain: 'Thêm thành viên vào nhóm, quản trị viên của nhóm sẽ thấy được hoạt động của thành viên.',
    tableHeader: {
      email: 'Email',
      name: 'Tên',
      actions: 'Thao tác',
      gender: 'Giới tính',
      position: 'Chức vụ'
    },
    labels: {
      name: 'Tên',
      description: 'Mô tả về nhóm',
      image: 'Ảnh đại diện nhóm'
    },
    placeholder: {
      description: 'Mô tả về nhóm',
      filterByEmail: 'Lọc theo email'
    },
    modal: {
      editUserTitle: 'Sửa thông tin thành viên',
      editTitle: 'Sửa thông tin nhóm'
    },
    tooltip: {
      editUser: 'Sửa thông tin thành viên',
      deleteUser: 'Xoá thành viên'
    }
  },
  header: {
    dashboard: 'Bảng thông tin',
    attendances: 'Hiện diện',
    requests: 'Yêu cầu',
    groups: 'Nhóm',
    notifications: 'Thông báo',
    noNotificationMsg: 'Bạn không có thông báo mới nào',
    settings: 'Tuỳ chỉnh',
    companySettings: 'Tuỳ chỉnh công ty',
    seeAll: 'Xem tất cả',
    logout: 'Đăng xuất',
    in: 'Đến',
    out: 'Về',
    punchIn: 'Đến rồi',
    punchInSuccess: 'Bạn đến lúc {at}',
    punchOut: 'Về đây',
    punchOutSuccess: 'Bạn về lúc {at}',
    punchOutTitle: 'Về đây',
    punchOutConfirm: 'Bạn có chắc muốn về lúc {at} ?',
    btnAnnualLeave: 'Nghỉ phép'
  },
  footer: {
    terms: 'Quy định',
    privacy: 'Bảo mật thông tin',
    help: 'Trợ giúp',
    contact: 'Liên hệ',
    about: 'Giới thiệu'
  },
  meta: {
    attendance_statuses: {
      attend_ok: 'Đến đúng giờ',
      attend_late: 'Đến trễ',
      leave_early: 'Về sớm',
      leave_ok: 'Về đúng giờ',
      unpaid_leave: 'Vắng ko phép',
      annual_leave: 'Vắng có phép',
      working_hours: 'Số giờ làm việc'
    },
    request_statuses: {
      pending: 'Đang chờ',
      approved: 'Đã duyệt',
      rejected: 'Từ chối'
    },
    gender: {
      male: 'Nam',
      female: 'Nữ'
    },
    languages: {
      en: 'Tiếng Anh',
      vi: 'Tiếng Việt',
      ja: 'Tiếng Nhật'
    },
    weekdays: {
      monday: 'Thứ 2',
      tuesday: 'Thứ 3',
      wednesday: 'Thứ 4',
      thursday: 'Thứ 5',
      friday: 'Thứ 6',
      saturday: 'Thứ 7',
      sunday: 'Chủ nhật'
    },
    roles: {
      member: 'Thành viên',
      admin: 'Quản trị viên',
      superadmin: 'Quản trị viên cao cấp'
    },
    holiday_countries: {
      vietnam: 'Việt Nam',
      japan: 'Nhật Bản'
    },
    industries: {
      hr_agency: 'Human Resource Agency',
      restaurant: 'Nhà hàng',
      cafe_shop: 'Quán cafe',
      software_company: 'Công ty phần mềm',
      startup: 'Startup'
    }
  },
  sidebar: {
    user: {
      profile: 'Thông tin cá nhân',
      password: 'Mật khẩu',
      security: 'Bảo mật'
    },
    company: {
      profile: 'Thông tin công ty',
      users: 'Thành viên',
      timezoneAndLanguage: 'Thời gian',
      businessDays: 'Ngày đi làm',
      holidays: 'Ngày lễ',
      allowedIPs: 'Địa chỉ IP'
    }
  },
  dashboard: {
    title: 'Bảng thông tin',
    calendar: 'Lịch',
    calendarToday: 'Hôm nay',
    chart: 'Biểu đồ',
    chartNoData: 'Bạn không có dữ liệu nào trong tháng này',
    recentActivities: 'Hoạt động gần đây'
  },
  notifications: {
    title: 'Thông báo',
    btn: {
      approve: 'Duyệt yêu cầu',
      reject: 'Từ chối yêu cầu'
    }
  },
  groups: {
    title: 'Nhóm',
    btn: {
      add: 'Tạo nhóm',
      leave: 'Rời nhóm',
      submit: 'Xác nhận'
    },
    member: ' | 1 thành viên | {count} thành viên',
    labels: {
      name: 'Tên',
      description: 'Mô tả về nhóm',
      image: 'Ảnh đại diện nhóm'
    },
    placeholder: {
      name: 'Tên',
      description: 'Mô tả về nhóm',
      filterByName: 'Lọc theo tên'
    },
    modal: {
      addTitle: 'Tạo nhóm'
    }
  },
  requests: {
    title: 'Yêu cầu',
    groupTitle: 'Yêu cầu từ nhóm {name}',
    placeholder: {
      filterByGroup: 'Lọc theo nhóm',
      filterByStatus: 'Lọc theo trạng thái',
      filterByKind: 'Lọc theo loại'
    },
    labels: {
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      leftAt: 'Về lúc',
      reason: 'Lý do',
      adminReason: 'Lý do từ chối'
    },
    tableHeader: {
      name: 'Tên',
      email: 'Email',
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      status: 'Trạng thái',
      leftAt: 'Về lúc',
      reason: 'Lý do',
      actions: 'Thao tác',
      kind: 'Loại'
    },
    btn: {
      save: 'Lưu',
      reject: 'Từ chối'
    },
    modal: {
      editTitle: 'Chỉnh sửa yêu cầu'
    },
    tooltip: {
      edit: 'Sửa yêu cầu',
      delete: 'Xoá yêu cầu',
      approve: 'Duyệt yêu cầu',
      reject: 'Từ chối yêu cầu'
    },
    errors: {
      bothAttendedLeft: 'Cả 2 attended at và left at {msg}'
    },
    confirmDialog: {
      deleteTitle: 'Xoá yêu cầu',
      deleteMsg: 'Bạn có chắc muốn xoá yêu cầu này vĩnh viễn ?'
    },
    kinds: {
      annual_leave: 'Nghỉ phép',
      attendance: 'Hiện diện'
    }
  },
  attendances: {
    title: 'Hiện diện',
    groupTitle: 'Hiện diện của nhóm {name}',
    placeholder: {
      fromDate: 'Từ ngày',
      toDate: 'Đến ngày',
      filterByStatus: 'Lọc theo trạng thái',
      filterByGroup: 'Lọc theo nhóm',
      filterByUser: 'Lọc theo thành viên'
    },
    tableHeader: {
      name: 'Tên',
      email: 'Email',
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      leftAt: 'Về lúc',
      status: 'Trạng thái',
      actions: 'Thao tác'
    },
    labels: {
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      leftAt: 'Về lúc',
      reason: 'Lý do'
    },
    btn: {
      save: 'Lưu',
      add: 'Tạo'
    },
    modal: {
      addTitle: 'Tạo yêu cầu'
    },
    tooltip: {
      addRequest: 'Tạo yêu cầu'
    }
  },
  user: {
    title: 'Tuỳ chỉnh của {name}',
    profile: {
      title: 'Thông tin cá nhân',
      labels: {
        avatar: 'Ảnh đại diện',
        email: 'Email',
        name: 'Tên',
        gender: 'Giới tính',
        position: 'Chức vụ',
        language: 'Ngôn ngữ',
        role: 'Quyền hạn'
      },
      btn: {
        save: 'Lưu'
      }
    },
    password: {
      title: 'Mật khẩu',
      labels: {
        currentPassword: 'Mật khẩu hiện tại',
        newPassword: 'Mật khẩu mới',
        confirmNewPassword: 'Xác nhận mật khẩu'
      },
      btn: {
        save: 'Lưu'
      }
    },
    security: {
      title: 'Bảo mật',
      currentSession: 'Phiên truy cập hiện tại',
      tableHeader: {
        client: 'Thiết bị',
        os: 'Hệ điều hành',
        ip: 'Địa chỉ IP',
        lastSignedIn: 'Lần cuối đăng nhập'
      },
      btn: {
        revoke: 'Huỷ'
      }
    }
  },
  company: {
    title: 'Tuỳ chỉnh công ty',
    profile: {
      title: 'Thông tin công ty',
      labels: {
        logo: 'Logo',
        name: 'Tên',
        industry: 'Lĩnh vực',
        country: 'Quốc gia',
        address: 'Địa chỉ',
        phoneNum: 'Điện thoại',
        postalCode: 'Mã vùng',
        taxCode: 'Mã số thuế'
      },
      btn: {
        save: 'Lưu'
      }
    },
    businessDays: {
      title: 'Ngày đi làm',
      tableHeader: {
        weekday: 'Ngày trong tuần',
        morningStartedAt: 'Bắt đầu buổi sáng',
        morningEndedAt: 'Kết thúc buổi sáng',
        afternoonStartedAt: 'Bắt đầu buổi chiều',
        afternoonEndedAt: 'Kết thúc buổi chiều'
      },
      labels: {
        weekday: 'Ngày trong tuần',
        morningStartedAt: 'Bắt đầu buổi sáng',
        morningEndedAt: 'Kết thúc buổi sáng',
        afternoonStartedAt: 'Bắt đầu buổi chiều',
        afternoonEndedAt: 'Kết thúc buổi chiều'
      },
      btn: {
        add: 'Tạo ngày đi làm',
        submit: 'Xác nhận',
        save: 'Lưu'
      },
      modal: {
        addTitle: 'Tạo ngày đi làm',
        editTitle: 'Chỉnh sửa ngày đi làm'
      },
      placeholder: {
        chooseWeekday: 'Chọn ngày trong tuần'
      },
      tooltip: {
        edit: 'Chỉnh sửa ngày đi làm',
        delete: 'Xoá ngày đi làm'
      }
    },
    allowedIPs: {
      title: 'Địa chỉ IP',
      tableHeader: {
        ipAddress: 'Địa chỉ IP',
        createdAt: 'Tạo lúc'
      },
      labels: {
        ipAddress: 'Địa chỉ IP'
      },
      btn: {
        add: 'Tạo địa chỉ IP',
        submit: 'Xác nhận',
        save: 'Lưu'
      },
      modal: {
        addTitle: 'Tạo địa chỉ IP',
        editTitle: 'Chỉnh sửa địa chỉ IP'
      },
      tooltip: {
        edit: 'Chỉnh sửa địa chỉ IP',
        delete: 'Xoá địa chỉ IP'
      }
    },
    timezoneAndLanguage: {
      title: 'Thời gian',
      labels: {
        timezone: 'Múi giờ',
        breaktime: 'Thời gian nghỉ trong ngày'
      },
      btn: {
        save: 'Lưu'
      },
      msg: {
        success: 'Thông tin công ty đă được cập nhật thành công'
      }
    },
    holidays: {
      title: 'Ngày lễ',
      explain: 'Thêm ngày lễ cho công ty sẽ giúp hệ thống tính đúng ngày nghỉ của thành viên',
      tableHeader: {
        name: 'Tên',
        startAt: 'Bắt đầu lúc',
        endAt: 'Kết thúc lúc'
      },
      labels: {
        name: 'Tên',
        startAt: 'Bắt đầu lúc',
        endAt: 'Kết thúc lúc'
      },
      placeholder: {
        chooseCountry: 'Chọn quốc gia',
        filterByName: 'Lọc theo tên',
        fromDate: 'Từ ngày',
        toDate: 'Đến ngày'
      },
      btn: {
        import: 'Nhập thêm',
        add: 'Tạo ngày lễ',
        submit: 'Xác nhận',
        save: 'Lưu'
      },
      modal: {
        addTitle: 'Tạo ngày lễ',
        editTitle: 'Chỉnh sửa ngày lễ'
      },
      tooltip: {
        edit: 'Chỉnh sửa ngày lễ',
        delete: 'Xoá ngày lễ'
      }
    },
    users: {
      title: 'Thành viên',
      add: {
        title: 'Tạo thành viên',
        successMsg: 'Bạn đã tạo thành viên thành công',
        note: 'Một email chưa thông tin đăng nhập của thành viên sẽ được gửi đến địa chỉ email. Vui lòng đảm bảo địa chỉ email chính xác',
        labels: {
          name: 'Tên',
          email: 'Email',
          role: 'Quyền hạn',
          group: 'Nhóm'
        },
        placeholder: {
          name: 'Tên',
          email: 'Email',
          chooseGroup: 'Chọn nhóm'
        },
        btn: {
          submit: 'Xác nhận'
        }
      },
      addMulti: {
        title: 'Tạo nhiều thành viên',
        successCSVMsg: 'Thành viên trong tập tin CSV đã được tạo',
        note: 'Một email chưa thông tin đăng nhập của thành viên sẽ được gửi đến địa chỉ email. Vui lòng đảm bảo địa chỉ email chính xác',
        errorMsg: 'Thông tin sai lêch ở một số dòng sau {rows}',
        download: 'Tải tập tin mẫu',
        templateGuide: 'Vui lòng tải tập tin mẫu, điền thông tin thành viên vào ô trống sau đó đẩy tập tin lên',
        labels: {
          csvFile: 'Tập tin CSV'
        },
        btn: {
          submit: 'Xác nhận'
        }
      },
      placeholder: {
        filterByEmail: 'Lọc theo email'
      },
      tableHeader: {
        name: 'Tên',
        email: 'Email',
        position: 'Chức vụ',
        group: 'Nhóm',
        role: 'Quyền hạn'
      },
      btn: {
        add: 'Tạo thành viên',
        addMulti: 'Tạo nhiều thành viên'
      },
      confirmDialog: {
        deleteUserTitle: 'Xoá thành viên',
        deleteUserMsg: 'Bạn có chắc muốn xoá thành viên <span class="text-bold-600">{name}</span> vĩnh viễn ?'
      },
      modal: {
        editTitle: 'Sửa thông tin thành viên'
      },
      tooltip: {
        edit: 'Sửa thông tin thành viên',
        remove: 'Loại bỏ thành viên'
      }
    }
  },
  messages: {
    company: {
      updateSuccess: 'Thông tin công ty đã được cập nhật',
      updateTimeSuccess: 'Múi giờ và giờ nghỉ đã được cập nhật'
    },
    user: {
      addSuccess: 'Một người dùng mới đã được tạo. Email chứa thông tin đăng nhập đã được gửi đến người dùng',
      updatePwdSuccess: 'Mật khẩu của bạn đã được cập nhật',
      addMultiSuccess: 'Danh sách người dùng trong tập tin CSV đã được tạo. Email chứa thông tin đã gửi đến email trong danh sách',
      updateProfileSuccess: 'Thông tin cá nhân đã được cập nhật'
    },
    ip: {
      createSuccess: 'Địa chỉ IP cho phép đã được tạo',
      updateSuccess: 'Địa chỉ IP cho phép đã được cập nhật'
    },
    group: {
      createSuccess: 'Nhóm đã được tạo',
      updateSuccess: 'Thông tin nhóm đã được cập nhật'
    },
    request: {
      createSuccess: 'Yêu cầu mới đã được tạo',
      updateSuccess: 'Thông tin yêu cầu đã được cập nhật',
      approvedSuccess: 'Yêu cầu đã được phê duyệt',
      rejectedSuccess: 'Yêu cầu đã bị loại bỏ'
    },
    holiday: {
      createSuccess: 'Ngày lễ đã được tạo',
      updateSuccess: 'Thông tin ngày lễ đã được cập nhật'
    },
    businessDay: {
      createSuccess: 'Ngày đi làm đã được tạo',
      updateSuccess: 'Thông tin ngày đi làm đã được cập nhật'
    }
  },
  activity: {
    attendance: {
      punch_in: '<span class="text-bold-600">{name}</span> đã đến văn phòng',
      punch_out: '<span class="text-bold-600">{name}</span> đã rời khỏi văn phòng'
    },
    request: {
      create: '<span class="text-bold-600">{name}</span> đã gửi yêu cầu thay đổi',
      update: '<span class="text-bold-600">{name}</span> đã chỉnh sửa yêu cầu',
      approve: '<span class="text-bold-600">{name}</span> đã duyệt yêu cầu của bạn',
      reject: '<span class="text-bold-600">{name}</span> đã từ chối yêu cầu của bạn'
    }
  },
  popup: {
    changePassword: {
      title: 'Mật khẩu của bạn không an toàn',
      description: 'Bạn đang dùng mật khẩu được tạo ra bởi hệ thống. Vui lòng đổi mật khẩu sớm nhất có thể',
      btnChange: 'Đổi mật khẩu',
      btnRemind: 'Nhắc lại sau'
    }
  },
  confirmDialog: {
    yes: 'Có',
    no: 'Không'
  },
  statusCards: {
    dayNum: '0 ngày | 1 ngày | {num} ngày',
    workingHours: '{workingHours}/{companyTotalHours} giờ'
  },
  annualLeave: {
    title: 'Xin nghỉ phép',
    labels: {
      annualLeaveDay: 'Ngày xin nghỉ',
      reason: 'Lý do'
    },
    createSuccessMsg: 'Yêu cầu xin nghỉ đã được gửi',
    updateSuccessMsg: 'Đã cập nhật ngày xin nghỉ phép',
    submit: 'Gửi',
    save: 'Lưu'
  }
}
