## User
|                               | Action       | Super Admin | Admin | Member| Note|
|:-----------------------------:|:------------:|:-----------:|:-----:|:-----:|:----|
| List all user                 | index        | ✓           | ✓     | ✗     |     |
| Show single user              | show         | ✓           | ✓     | ✓     | Member only show himself |
| Create user                   | create       | ✓           | ✓     | ✗     |     |
| Create multi user by csv file | create_multi | ✓           | ✓     | ✗     |     |
| Update user in a company      | update       | ✓           | ✓     | ✓     | Member only update himself |
| Destroy user in a company     | destroy      | ✓           | ✓     | ✗     |     |

## Company
|                         | Action       | Super Admin | Admin | Member|
|:-----------------------:|:------------:|:-----------:|:-----:|:-----:|
| Update company info     | update       | ✓           | ✓     | ✗     |
| Set up rule for company | setup_rules  | ✓           | ✓     | ✗     |
| Deactivate a company    | deactivate   | ✓           | ✗     | ✗     |
| Destroy a company       | destroy      | ✓           | ✗     | ✗     |

## Allowed Ip
|               | Action       | Super Admin | Admin | Member|
|:-------------:|:------------:|:-----------:|:-----:|:-----:|
| List all ips  | index        | ✓           | ✓     | ✗     |
| Create ip     | create       | ✓           | ✓     | ✗     |
| Update ip     | update       | ✓           | ✓     | ✗     |
| Destroy ip    | destroy      | ✓           | ✓     | ✗     |

## Attendance
|               | Action       | Super Admin | Admin | Member|
|:-------------:|:------------:|:-----------:|:-----:|:-----:|
| Check in      | create       | ✓           | ✓     | ✓     |
| Check out     | update       | ✓           | ✓     | ✓     |

## Business Days
|               | Action       | Super Admin | Admin | Member|
|:-------------:|:------------:|:-----------:|:-----:|:-----:|
| List all days | index        | ✓           | ✓     | ✗     |
| Create day    | create       | ✓           | ✓     | ✗     |
| Update day    | update       | ✓           | ✓     | ✗     |
| Destroy day   | destroy      | ✓           | ✓     | ✗     |

## Custom Holiday
|                   | Action       | Super Admin | Admin | Member|
|:-----------------:|:------------:|:-----------:|:-----:|:-----:|
| List all holidays | index        | ✓           | ✓     | ✗     |
| Create holiday    | create       | ✓           | ✓     | ✗     |
| Update holiday    | update       | ✓           | ✓     | ✗     |
| Destroy holiday   | destroy      | ✓           | ✓     | ✗     |

## Custom Holiday
|                   | Action       | Super Admin | Admin | Member|
|:-----------------:|:------------:|:-----------:|:-----:|:-----:|
| List all holidays | index        | ✓           | ✓     | ✗     |
| Create holiday    | create       | ✓           | ✓     | ✗     |
| Update holiday    | update       | ✓           | ✓     | ✗     |
| Destroy holiday   | destroy      | ✓           | ✓     | ✗     |

## Holiday
|                              | Action          | Super Admin | Admin | Member|
|:----------------------------:|:---------------:|:-----------:|:-----:|:-----:|
| List all holidays            | index           | ✓           | ✓     | ✗     |
| Adds national holidays       | import          | ✓           | ✓     | ✗     |
| Remove holiday from a company| company_destroy | ✓           | ✓     | ✗     |

## Department
|                     | Action       | Super Admin | Admin | Member|
|:-------------------:|:------------:|:-----------:|:-----:|:-----:|
| List all department | index        | ✓           | ✓     | ✗     |
| Show department     | show         | ✓           | ✓     | ✗     |
| Create department   | create       | ✓           | ✓     | ✗     |
| Update department   | update       | ✓           | ✓     | ✗     |
| Destroy department  | destroy      | ✓           | ✓     | ✗     |

## Group
|                 | Action       | Super Admin | Admin | Member|
|:---------------:|:------------:|:-----------:|:-----:|:-----:|
| List all groups | index        | ✓           | ✓     | ✗     |
| Show group      | show         | ✓           | ✓     | ✗     |
| Create group    | create       | ✓           | ✓     | ✗     |
| Update group    | update       | ✓           | ✓     | ✗     |
| Destroy group   | destroy      | ✓           | ✓     | ✗     |

## Permission
|                      | Action       | Super Admin | Admin | Member|
|:--------------------:|:------------:|:-----------:|:-----:|:-----:|
| List all Permissions | index        | ✓           | ✓     | ✗     |

## Request
|                   | Action       | Super Admin | Admin | Member|
|:-----------------:|:------------:|:-----------:|:-----:|:-----:|
| List all requests | index        | ✓           | ✓     | ✗     |
| Show request      | show         | ✓           | ✓     | ✗     |
| Create request    | create       | ✓           | ✓     | ✓     |
| Update request    | update       | ✓           | ✓     | ✓     |
| Approve request   | approve      | ✓           | ✓     | ✗     |
| Reject request    | reject       | ✓           | ✓     | ✗     |
| Destroy request   | destroy      | ✓           | ✓     | ✗     |
