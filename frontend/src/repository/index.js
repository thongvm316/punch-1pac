import groupsRepository from './groups'
import usersRepository from './users'
import activitiesRepository from './activities'
import announcementsRepository from './announcements'
import attendancesRepository from './attendances'
import companySettingsRepository from './company-settings'
import requestsRepository from './requests'
import notificationsRepository from './notifications'

const repositories = {
  groups: groupsRepository,
  users: usersRepository,
  activities: activitiesRepository,
  announcements: announcementsRepository,
  attendances: attendancesRepository,
  companySettings: companySettingsRepository,
  requests: requestsRepository,
  notifications: notificationsRepository
}

export default {
  get: name => repositories[name]
}
