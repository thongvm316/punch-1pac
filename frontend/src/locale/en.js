export default {
  group: {
    btn: {
      addUser: 'Add',
      edit: 'Edit Group',
      save: 'Save'
    },
    explain: "Add a member to this group, then manager of this group can see the user's activities",
    tableHeader: {
      email: 'Email',
      name: 'Name',
      actions: 'Actions',
      gender: 'Gender',
      position: 'Position'
    },
    labels: {
      name: 'Name'
    },
    modal: {
      editTitle: 'Edit Group'
    }
  },
  header: {
    dashboard: 'Dashboard',
    attendances: 'Attendances',
    requests: 'Requests',
    groups: 'Groups',
    announcements: 'Annoucements',
    noAnnouncementMsg: 'You have no new announcements',
    settings: 'Settings',
    companySettings: 'Company Settings',
    seeAll: 'See All',
    logout: 'Logout',
    in: 'In',
    out: 'Out',
    punchIn: 'Punch In',
    punchOut: 'Punch Out'
  },
  footer: {
    terms: 'Terms',
    privacy: 'Privacy',
    help: 'Help',
    contact: 'Contact',
    about: 'About'
  },
  meta: {
    attendanceStatuses: {
      attend_ok: 'Attend OK',
      attend_late: 'Attend Late',
      leave_early: 'Leave Early',
      leave_ok: 'Leave OK'
    },
    requestStatuses: {
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
      jp: 'Japanese'
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
    holidayCountries: {
      vietnam: 'Vietnam',
      japan: 'Japan'
    },
    industries: {
      hr_agency: 'Human Resource Agency',
      restaurant: 'Restaurant',
      cafe_shop: 'Cafe shop',
      software_company: 'Software Company',
      startup: 'Startup'
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
      timezoneAndLanguage: 'Timezone and Language',
      bussinessDays: 'Bussiness Days',
      holidays: 'Holidays',
      allowedIPs: 'Allowed IPs'
    }
  },
  dashboard: {
    title: 'Dashboard',
    calendar: 'Calendar',
    statusInMonth: 'Status In Month',
    status: 'Status',
    numberOfDays: 'Number of days',
    arriveOnTime: 'Arrive on time',
    day: '0 | 1 day | {count} days',
    chart: 'Chart'
  },
  announcements: {
    title: 'Announcements',
    tableHeader: {
      title: 'Title',
      status: 'Status',
      sentAt: 'Sent At'
    }
  },
  groups: {
    title: 'Groups',
    btn: {
      add: 'Add Group',
      leave: 'Leave',
      submit: 'Submit'
    },
    member: ' | 1 member | {count} members',
    labels: {
      name: 'Name'
    },
    placeholder: {
      name: 'Name'
    },
    modal: {
      addTitle: 'Add group'
    }
  },
  requests: {
    title: 'Requests',
    placeholder: {
      filterByGroup: 'Filter by group',
      filterByStatus: 'Filter by status'
    },
    tab: {
      my: 'My Requests',
      group: 'Group Requests'
    },
    labels: {
      date: 'Date',
      attendedAt: 'Attended At',
      leftAt: 'Left At',
      reason: 'Reason'
    },
    tableHeader: {
      name: 'Name',
      email: 'Email',
      date: 'Date',
      attendedAt: 'Attended At',
      status: 'Status',
      leftAt: 'Left At',
      reason: 'Reason',
      actions: 'Actions'
    },
    btn: {
      save: 'Save'
    },
    modal: {
      editTitle: 'Edit Title'
    }
  },
  attendances: {
    title: 'Attendances',
    placeholder: {
      fromDate: 'From date',
      toDate: 'To date',
      filterByStatus: 'Filter by status',
      filterByGroup: 'Filter by group'
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
    tab: {
      my: 'My Attendances',
      group: 'Group Attendances'
    },
    labels: {
      date: 'Date',
      attendedAt: 'Attended At',
      leftAt: 'Left At',
      reason: 'Reason'
    },
    btn: {
      save: 'Save'
    },
    modal: {
      addTitle: 'Add request'
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
        position: 'Position'
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
      tableHeader: {
        client: 'Client',
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
        startedAt: 'Started at',
        endedAt: 'Ended at'
      },
      labels: {
        weekday: 'Weekday',
        startedAt: 'Started at',
        endedAt: 'Ended at'
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
      }
    },
    allowedIPs: {
      title: 'Allowed IPs',
      tableHeader: {
        ipAddress: 'IP address',
        createdAt: 'Created at'
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
      }
    },
    timezoneAndLanguage: {
      title: 'Timezone and Language',
      labels: {
        timezone: 'Timezone',
        language: 'Language',
        breakdays: 'Break days',
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
        endAt: 'End at'
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
        role: 'Role'
      },
      btn: {
        add: 'Add user',
        addMulti: 'Add multi users'
      },
      confirmDialog: {
        deleteUserTitle: 'Delete user',
        deleteUserMsg: 'Are you sure to delete <strong>{name}</strong> user permanently ?'
      }
    }
  }
}
