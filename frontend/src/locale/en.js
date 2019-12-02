export default {
  group: {
    users: 'Users',
    attendances: 'Attendances',
    requests: 'Requests',
    report: 'Report',
    month: 'Month',
    year: 'Year',
    btn: {
      addUser: 'Add',
      edit: 'Edit Group',
      save: 'Save',
      delete: 'Delete Group'
    },
    explain: "Add a member to this group, then manager of this group can see the user's activities",
    tableHeader: {
      email: 'Email',
      name: 'Name',
      actions: 'Actions',
      gender: 'Gender',
      position: 'Position',
      role: 'Role'
    },
    labels: {
      name: 'Name',
      description: 'Description',
      image: 'Image'
    },
    placeholder: {
      description: 'Description',
      filterByEmail: 'Filter by email',
      searchByNameEmail: 'Search user by name or email'
    },
    modal: {
      editUserTitle: 'Edit User',
      editTitle: 'Edit Group'
    },
    tooltip: {
      editUser: 'Edit user',
      activateUser: 'Activate user',
      deactivateUser: 'Deactivate user',
      removeUser: 'Remove user'
    },
    confirmDialog: {
      deactivateUserTitle: 'Deactivate user',
      removeUserTitle: 'Remove user out of this group',
      removeUserMsg: 'Are you sure to remove <span class="text-bold-600">{name}</span> out of this group?',
      deactivateUserMsg: 'Are you sure to deactivate <span class="text-bold-600">{name}</span>?',
      deleteGroupTitle: 'Delete group',
      deleteGroupMsg: 'Are you sure to delete <span class="text-bold-600">{name}</span> group permanently?'
    }
  },
  header: {
    dashboard: 'Dashboard',
    attendances: 'Attendances',
    requests: 'Requests',
    groups: 'Groups',
    notifications: 'Notifications',
    noNotificationMsg: 'You have no new notifications',
    settings: 'Settings',
    companySettings: 'Company Settings',
    seeAll: 'See All',
    logout: 'Logout',
    in: 'In',
    out: 'Out',
    punchIn: 'Punch In',
    punchInSuccess: 'You punched in at {at}',
    punchOut: 'Punch Out',
    punchOutSuccess: 'You punched out at {at}',
    punchOutTitle: 'Punch Out',
    punchOutConfirm: 'Do you intent to punch out at {at} ?',
    btnAnnualLeave: 'Day Off',
    btnLeave: 'Day Off',
    changeLanguage: 'Change Language',
    languages: 'Languages'
  },
  footer: {
    terms: 'Terms',
    privacy: 'Privacy',
    help: 'Help',
    contact: 'Contact us',
    about: 'About'
  },
  meta: {
    attendance_statuses: {
      attend_ok: 'Attend OK',
      attend_late: 'Attend Late',
      leave_early: 'Leave Early',
      leave_ok: 'Leave OK',
      unpaid_leave: 'Unpaid leave',
      annual_leave: 'Day Off',
      leave: 'Day Off',
      working_hours: 'Working hours'
    },
    request_statuses: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    gender: {
      male: 'Male',
      female: 'Female'
    },
    languages: {
      en: 'English',
      vi: 'Vietnamese',
      ja: 'Japanese'
    },
    weekdays: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },
    roles: {
      member: 'Member',
      admin: 'Admin',
      superadmin: 'Superadmin'
    },
    holiday_countries: {
      vietnam: 'Vietnam',
      japan: 'Japan'
    },
    industries: {
      hr_agency: 'Human Resource Agency',
      restaurant: 'Restaurant',
      cafe_shop: 'Cafe shop',
      software_company: 'Software Company',
      startup: 'Startup',
      interior_design: 'Interior Design'
    }
  },
  sidebar: {
    user: {
      profile: 'Profile',
      password: 'Password',
      security: 'Security'
    },
    company: {
      profile: 'Profile',
      users: 'Users',
      timezoneAndLanguage: 'Time',
      businessDays: 'Business Days',
      holidays: 'Holidays',
      allowedIPs: 'Allowed IPs'
    }
  },
  dashboard: {
    title: 'Dashboard',
    calendar: 'Calendar',
    calendarToday: 'Today',
    chart: 'Chart',
    chartNoData: "You don't have any data on this month",
    recentActivities: 'Recent activities',
    emptyActivity: "You don't have any activity",
    pendingRequests: 'Pending requests',
    havePendingRequests: 'You have pending requests in below groups:',
    emptyPendingRequests: "You don't have any pending requests in your groups",
    request: {
      title: 'What kind of request do you want to send ?',
      label: 'Kind',
      kind: {
        attendance: 'Request for editing attendance',
        annual_leave: 'Request a day off'
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
      filterByKind: 'Filter by kind',
      filterByUser: 'Filter by user'
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
      annual_leave: 'Day Off',
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
        taxCode: 'Tax code',
        punchMethod: 'Punch method'
      },
      btn: {
        save: 'Save'
      }
    },
    punchMethod: {
      default: 'Default',
      qrcode: 'QRCode'
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
      explain: "Import country's holidays for your company, then system will not count a holiday as leaving day",
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
      updateSuccess: 'Group is updated',
      addMemberSuccess: 'New member has been added'
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
      annualLeaveDay: 'Day Off',
      reason: 'Reason'
    },
    createSuccessMsg: 'A day off request is created',
    updateSuccessMsg: 'Your day off request is updated',
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
  },
  filterUserBox: {
    noOptions: 'No user matching'
  }
}
