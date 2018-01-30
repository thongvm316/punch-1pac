# Permission on user controller
Permission.create(name: 'List all user',                 controller: 'api/v1/users', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Show single user',              controller: 'api/v1/users', action: 'show', role: User.roles[:member])
Permission.create(name: 'Create user',                   controller: 'api/v1/users', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Create multi user by csv file', controller: 'api/v1/users', action: 'create_multi', role: User.roles[:admin])
Permission.create(name: 'Update user in a company',      controller: 'api/v1/users', action: 'update', role: User.roles[:member])
Permission.create(name: 'Destroy user in a company',     controller: 'api/v1/users', action: 'destroy', role: User.roles[:admin])

# Permission on company controller
Permission.create(name: 'Update company info',     controller: 'api/v1/companies', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Set up rule for company', controller: 'api/v1/companies', action: 'setup_rules', role: User.roles[:admin])
Permission.create(name: 'Deactivate a company',    controller: 'api/v1/companies', action: 'deactivate', role: User.roles[:superadmin])
Permission.create(name: 'Destroy a company',       controller: 'api/v1/companies', action: 'destroy', role: User.roles[:superadmin])

# Permission on allowed ip controller
Permission.create(name: 'List all ips', controller: 'api/v1/allowed_ips', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Create ip',    controller: 'api/v1/allowed_ips', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update ip',    controller: 'api/v1/allowed_ips', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Destroy ip',   controller: 'api/v1/allowed_ips', action: 'destroy', role: User.roles[:admin])

# Permission on attendances controller
Permission.create(name: 'Check in', controller: 'api/v1/attendances', action: 'create', role: User.roles[:member])
Permission.create(name: 'Check out',    controller: 'api/v1/attendances', action: 'update', role: User.roles[:member])

# Permission on business day controller
Permission.create(name: 'List all days', controller: 'api/v1/business_days', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Create day',    controller: 'api/v1/business_days', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update day',    controller: 'api/v1/business_days', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Destroy day',   controller: 'api/v1/business_days', action: 'destroy', role: User.roles[:admin])

# Permission on custom holiday controller
Permission.create(name: 'List all holidays', controller: 'api/v1/custom_holidays', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Create holiday',    controller: 'api/v1/custom_holidays', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update holiday',    controller: 'api/v1/custom_holidays', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Destroy holiday',   controller: 'api/v1/custom_holidays', action: 'destroy', role: User.roles[:admin])

# Permission on holiday controller
Permission.create(name: 'List all holidays',             controller: 'api/v1/holidays', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Adds national holidays',        controller: 'api/v1/holidays', action: 'import', role: User.roles[:admin])
Permission.create(name: 'Remove holiday from a company', controller: 'api/v1/holidays', action: 'company_destroy', role: User.roles[:admin])

# Permission on department controller
Permission.create(name: 'List all departments', controller: 'api/v1/departments', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Show department',      controller: 'api/v1/departments', action: 'show', role: User.roles[:admin])
Permission.create(name: 'Create department',    controller: 'api/v1/departments', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update department',    controller: 'api/v1/departments', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Destroy department',   controller: 'api/v1/departments', action: 'destroy', role: User.roles[:admin])

# Permission on group controller
Permission.create(name: 'List all groups', controller: 'api/v1/groups', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Show group',      controller: 'api/v1/groups', action: 'show', role: User.roles[:admin])
Permission.create(name: 'Create group',    controller: 'api/v1/groups', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update group',    controller: 'api/v1/groups', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Destroy group',   controller: 'api/v1/groups', action: 'destroy', role: User.roles[:admin])

# Permission on permission controller
Permission.create(name: 'List all Permissions',   controller: 'api/v1/permissions', action: 'index', role: User.roles[:admin])

# Permission on request controller
Permission.create(name: 'List all requests', controller: 'api/v1/requests', action: 'index', role: User.roles[:admin])
Permission.create(name: 'Show request',      controller: 'api/v1/requests', action: 'show', role: User.roles[:admin])
Permission.create(name: 'Create request',    controller: 'api/v1/requests', action: 'create', role: User.roles[:admin])
Permission.create(name: 'Update request',    controller: 'api/v1/requests', action: 'update', role: User.roles[:admin])
Permission.create(name: 'Approve request',   controller: 'api/v1/requests', action: 'approve', role: User.roles[:admin])
Permission.create(name: 'Reject request',    controller: 'api/v1/requests', action: 'reject', role: User.roles[:admin])
Permission.create(name: 'Destroy request',   controller: 'api/v1/requests', action: 'destroy', role: User.roles[:admin])

