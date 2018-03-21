export default {
  group: {
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
      name: 'Tên'
    },
    placeholder: {
      filterByEmail: 'Lọc theo email'
    },
    modal: {
      editTitle: 'Chỉnh sửa Nhóm'
    }
  },
  header: {
    dashboard: 'Bảng thông tin',
    attendances: 'Hiện diện',
    requests: 'Yêu cầu',
    groups: 'Nhóm',
    announcements: 'Thông báo',
    noAnnouncementMsg: 'Bạn không có thông báo mới nào',
    settings: 'Tuỳ chỉnh',
    companySettings: 'Tuỳ chỉnh công ty',
    seeAll: 'Xem tất cả',
    logout: 'Đăng xuất',
    in: 'Đến',
    out: 'Về',
    punchIn: 'Đến rồi',
    punchOut: 'Về đây'
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
      annual_leave: 'Vắng có phép'
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
      bussinessDays: 'Ngày đi làm',
      holidays: 'Ngày lễ',
      allowedIPs: 'Địa chỉ IP'
    }
  },
  dashboard: {
    title: 'Bảng thông tin',
    calendar: 'Lịch',
    chart: 'Biểu đồ'
  },
  announcements: {
    title: 'Thông báo',
    tableHeader: {
      title: 'Tiêu đề',
      status: 'Trạng thái',
      sentAt: 'Gửi lúc'
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
      name: 'Tên'
    },
    placeholder: {
      name: 'Tên'
    },
    modal: {
      addTitle: 'Tạo nhóm'
    }
  },
  requests: {
    title: 'Yêu cầu',
    placeholder: {
      filterByGroup: 'Lọc theo nhóm',
      filterByStatus: 'Lọc theo trạng thái'
    },
    tab: {
      my: 'Yêu cầu của tôi',
      group: 'Yêu cầu của nhóm'
    },
    labels: {
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      leftAt: 'Về lúc',
      reason: 'Lý do'
    },
    tableHeader: {
      name: 'Tên',
      email: 'Email',
      date: 'Ngày',
      attendedAt: 'Đến lúc',
      status: 'Trạng thái',
      leftAt: 'Về lúc',
      reason: 'Lý do',
      actions: 'Thao tác'
    },
    btn: {
      save: 'Lưu'
    },
    modal: {
      editTitle: 'Chỉnh sửa yêu cầu'
    }
  },
  attendances: {
    title: 'Hiện diện',
    placeholder: {
      fromDate: 'Từ ngày',
      toDate: 'Đến ngày',
      filterByStatus: 'Lọc theo trạng thái',
      filterByGroup: 'Lọc theo nhóm'
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
    tab: {
      my: 'Hiện diện của tôi',
      group: 'Hiện diện của nhóm'
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
        language: 'Ngôn ngữ'
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
      tableHeader: {
        client: 'Thiết bị',
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
        startedAt: 'Bắt đầu lúc',
        endedAt: 'Kết thúc lúc'
      },
      labels: {
        weekday: 'Ngày trong tuần',
        startedAt: 'Bắt đầu lúc',
        endedAt: 'Kết thúc lúc'
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
        deleteUserMsg: 'Bạn có chắc muốn xoá thành viên <strong>{name}</strong> vĩnh viễn ?'
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
      updateSuccess: 'Thông tin yêu cầu đã được cập nhật'
    },
    holiday: {
      createSuccess: 'Ngày lễ đã được tạo',
      updateSuccess: 'Thông tin ngày lễ đã được cập nhật'
    },
    businessDay: {
      createSuccess: 'Ngày đi làm đã được tạo',
      updateSuccess: 'Thông tin ngày đi làm đã được cập nhật'
    }
  }
}
